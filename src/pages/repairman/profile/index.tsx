import { useEffect, useState } from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
  Box,
  Checkbox,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import RepairmanDashboard from '../../../layouts/RepairmanDashboard'
import axios from '../../../utils/axios'
import { REPAIRMAN, SPECIALIZE } from '../../../types'
import { getBase64 } from '../../../utils/file'
import {
  pushNotification,
  resetNotification,
} from '../../../redux/actions/notification.action'
import { NotificationStatus } from '../../../redux/types/notification.type'

export default function RepairmanDetail() {
  const dispatch = useDispatch()
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [repairman, setRepairman] = useState<REPAIRMAN>({})
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [avatar, setAvatar] = useState<File | null>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  const [isCheckComputer, setIsCheckComputer] = useState<boolean>(false)
  const [computerDescription, setComputerDescription] = useState<string>('')
  const [computerId, setComputerId] = useState<number>()
  const [isCheckPrinter, setIsCheckPrinter] = useState<boolean>(false)
  const [printerDescription, setPrinterDescription] = useState<string>('')
  const [printerId, setPrinterId] = useState<number>()
  const [isCheckFax, setIsCheckFax] = useState<boolean>(false)
  const [faxDescription, setFaxDescription] = useState<string>('')
  const [faxId, setFaxId] = useState<number>()

  const onHandleUpdate = async () => {
    const data = {
      email,
      phone,
      dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
      specializes: [
        {
          id: computerId,
          active: isCheckComputer,
          description: computerDescription,
        },
        {
          id: printerId,
          active: isCheckPrinter,
          description: printerDescription,
        },
        {
          id: faxId,
          active: isCheckFax,
          description: faxDescription,
        },
      ],
    }
    if (avatar) {
      axios
        .put(`/repairman/me`, {
          ...data,
          avatar: await getBase64(avatar),
        })
        .then((res) => {
          dispatch(
            pushNotification({
              title: res.data.message,
              description: res.data.description,
              status: NotificationStatus.SUCCESS,
            })
          )
          dispatch(resetNotification())
        })
        .catch((error) => {
          dispatch(
            pushNotification({
              title: error.response.data.message,
              description: error.response.data.description,
              status: NotificationStatus.ERROR,
            })
          )
          dispatch(resetNotification())
        })
    } else {
      axios
        .put(`/repairman/me`, {
          ...data,
        })
        .then((res) => {
          dispatch(
            pushNotification({
              title: res.data.message,
              description: res.data.description,
              status: NotificationStatus.SUCCESS,
            })
          )
          dispatch(resetNotification())
        })
        .catch((error) => {
          dispatch(
            pushNotification({
              title: error.response.data.message,
              description: error.response.data.description,
              status: NotificationStatus.ERROR,
            })
          )
          dispatch(resetNotification())
        })
    }
  }

  useEffect(() => {
    repairman.specializes?.forEach((specialize: SPECIALIZE) => {
      switch (specialize.facilityType?.name) {
        case 'computer':
          setIsCheckComputer(specialize.active || false)
          setComputerDescription(specialize.description || '')
          setComputerId(specialize.id)
          break
        case 'printer':
          setIsCheckPrinter(specialize.active || false)
          setPrinterDescription(specialize.description || '')
          setPrinterId(specialize.id)
          break
        case 'fax':
          setIsCheckFax(specialize.active || false)
          setFaxDescription(specialize.description || '')
          setFaxId(specialize.id)
          break
        default:
          break
      }
    })

    setEmail(repairman.email)
    setPhone(repairman.phone)
    setAvatarUrl(repairman.avatar)
    handleDateChange(moment(new Date(repairman.dateOfBirth || new Date())))
  }, [repairman])

  useEffect(() => {
    axios.get('/repairman/me').then((response) => {
      setRepairman(response.data.repairman)
    })
  }, [])

  return (
    <RepairmanDashboard isProfile>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/repairman/profile'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Thông tin cá nhân</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={3}>
          <FormControl id='identity' isRequired>
            <FormLabel>Mã nhân viên</FormLabel>
            <Input type='text' value={repairman.identity} disabled />
          </FormControl>
          <FormControl id='name' mt='5' isRequired>
            <FormLabel>Tên</FormLabel>
            <Input type='text' value={repairman.name} disabled />
          </FormControl>
          <FormControl id='unit' mt='5' isRequired>
            <FormLabel>Đơn vị</FormLabel>
            <Input type='text' value={repairman.unit} disabled />
          </FormControl>
          <FormControl id='date_of_birth' mt='5'>
            <FormLabel>Ngày sinh</FormLabel>
            <SingleDatePicker
              date={selectedDate}
              onDateChange={(date) => handleDateChange(date)}
              focused={focused}
              onFocusChange={({ focused }: { focused: boolean }) => {
                setFocused(focused)
              }}
              displayFormat='DD/MM/yyyy'
              enableOutsideDays
              isOutsideRange={() => false}
              numberOfMonths={1}
              id='room-date'
            />
          </FormControl>
          <FormControl id='email' mt='5'>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              defaultValue={repairman.email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
          </FormControl>
          <FormControl id='phone' mt='5'>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              type='text'
              defaultValue={repairman.phone}
              onChange={(event) => {
                setPhone(event.target.value)
              }}
            />
          </FormControl>
          <FormControl id='phone' mt='5'>
            <FormLabel>Chuyên môn</FormLabel>
            <Box pl='5'>
              <Checkbox
                isChecked={isCheckComputer}
                colorScheme='teal'
                onChange={(e) => setIsCheckComputer(e.target.checked)}>
                <Text textStyle='bold-sm'>Máy tính</Text>
              </Checkbox>
              <Textarea
                mt='1'
                placeholder='Mô tả'
                defaultValue={computerDescription}
                onChange={(event) => {
                  setComputerDescription(event.target.value)
                }}
              />
            </Box>
            <Box pl='5' mt='4'>
              <Checkbox
                isChecked={isCheckPrinter}
                colorScheme='teal'
                onChange={(e) => setIsCheckPrinter(e.target.checked)}>
                <Text textStyle='bold-sm'>Máy in</Text>
              </Checkbox>
              <Textarea
                mt='1'
                placeholder='Mô tả'
                defaultValue={printerDescription}
                onChange={(event) => {
                  setPrinterDescription(event.target.value)
                }}
              />
            </Box>
            <Box pl='5' mt='4'>
              <Checkbox
                isChecked={isCheckFax}
                colorScheme='teal'
                onChange={(e) => setIsCheckFax(e.target.checked)}>
                <Text textStyle='bold-sm'>Máy fax</Text>
              </Checkbox>
              <Textarea
                mt='1'
                placeholder='Mô tả'
                defaultValue={faxDescription}
                onChange={(event) => {
                  setFaxDescription(event.target.value)
                }}
              />
            </Box>
          </FormControl>

          <Button
            colorScheme='teal'
            size='sm'
            my='5'
            float='right'
            onClick={onHandleUpdate}>
            Cập nhật thông tin
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Avatar
              name={`${repairman.name}`}
              w='12rem'
              h='12rem'
              src={`${avatarUrl}`}
            />
          </Center>
          <Center mt={5}>
            <FormControl id='avatar'>
              <FormLabel
                display='flex'
                justifyContent='center'
                alignItems='center'
                cursor='pointer'>
                {/* <Button
                size='sm'
                variant='outline'
                leftIcon={<EditIcon />}
                colorScheme='teal'> */}
                <EditIcon colorScheme='teal' />
                <Text ml='3' colorScheme='teal' textStyle='bold-sm'>
                  Chỉnh sửa
                </Text>
                {/* </Button> */}
              </FormLabel>
              <Input
                type='file'
                display='none'
                onChange={(event: any) => {
                  setAvatarUrl(URL.createObjectURL(event.target?.files[0]))
                  setAvatar(event.target?.files[0])
                }}
              />
            </FormControl>
          </Center>
        </GridItem>
      </Grid>
    </RepairmanDashboard>
  )
}
