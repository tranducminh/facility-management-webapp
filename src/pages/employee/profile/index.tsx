import { useState, useEffect } from 'react'
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'
import axios from '../../../utils/axios'
import { EMPLOYEE } from '../../../types'
import { getBase64 } from '../../../utils/file'
import {
  pushNotification,
  resetNotification,
} from '../../../redux/actions/notification.action'
import { NotificationStatus } from '../../../redux/types/notification.type'

export default function Profile() {
  const dispatch = useDispatch()
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [avatar, setAvatar] = useState<File | null>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  const [employee, setEmployee] = useState<EMPLOYEE>({})
  useEffect(() => {
    axios
      .get('/employees/me')
      .then((res) => {
        setEmployee(res.data.employee)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setEmail(employee.email || '')
    setPhone(employee.phone || '')
    setAvatarUrl(employee.avatar)
    handleDateChange(moment(new Date(employee.dateOfBirth || new Date())))
  }, [employee])

  const onHandleUpdate = async () => {
    if (avatar) {
      axios
        .put(`/employees/me`, {
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
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
        .put(`/employees/me`, {
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
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

  return (
    <EmployeeDashboard isProfile title={employee?.name || 'Trang cá nhân'}>
      <Text textStyle='bold-xl'>Thông tin phòng</Text>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='5'>
        <GridItem colSpan={3}>
          {employee.room ? (
            <>
              <FormControl id='identity'>
                <FormLabel>Tòa nhà</FormLabel>
                <Input
                  type='text'
                  isDisabled
                  value={employee.room?.floor?.building?.name}
                />
              </FormControl>
              <FormControl id='name' mt='5'>
                <FormLabel>Tầng</FormLabel>
                <Input
                  type='text'
                  isDisabled
                  value={employee.room?.floor?.name}
                />
              </FormControl>
              <FormControl id='unit' mt='5'>
                <FormLabel>Phòng</FormLabel>
                <Input type='text' isDisabled value={employee.room?.name} />
              </FormControl>
            </>
          ) : (
            <Alert
              status='info'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'>
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Bạn chưa có phòng
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                Liên hệ quản trị viên để biết thêm thông tin chi tiết
              </AlertDescription>
            </Alert>
          )}
        </GridItem>
        <GridItem colSpan={2} />
      </Grid>

      <Text textStyle='bold-xl' mt='5'>
        Thông tin cá nhân
      </Text>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='5'>
        <GridItem colSpan={3}>
          <FormControl id='identity' isRequired>
            <FormLabel>Mã nhân viên</FormLabel>
            <Input type='text' isDisabled value={employee.identity} />
          </FormControl>
          <FormControl id='name' mt='5' isRequired>
            <FormLabel>Tên</FormLabel>
            <Input type='text' isDisabled value={employee.name} />
          </FormControl>
          <FormControl id='unit' mt='5' isRequired>
            <FormLabel>Đơn vị</FormLabel>
            <Input type='text' isDisabled value={employee.unit} />
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
              defaultValue={employee.email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
          </FormControl>
          <FormControl id='phone' mt='5'>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              type='text'
              defaultValue={employee.phone}
              onChange={(event) => {
                setPhone(event.target.value)
              }}
            />
          </FormControl>

          <Button
            colorScheme='teal'
            size='sm'
            my='5'
            float='right'
            onClick={onHandleUpdate}>
            Lưu thay đổi
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Avatar
              name={`${employee.name}`}
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
                <EditIcon colorScheme='teal' />
                <Text ml='3' colorScheme='teal' textStyle='bold-sm'>
                  Chỉnh sửa
                </Text>
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
    </EmployeeDashboard>
  )
}
