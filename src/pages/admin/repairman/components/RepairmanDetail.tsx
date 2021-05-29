/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from 'react'
import {
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
  FormErrorMessage,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { REPAIRMAN } from '../../../../types'
import axios from '../../../../utils/axios'
import { getBase64 } from '../../../../utils/file'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

type FormData = {
  identity?: string
  name?: string
  unit?: string
}

export default function RepairmanDetail({
  repairman,
  refresh,
}: {
  repairman: REPAIRMAN
  refresh: Function
}) {
  const dispatch = useDispatch()
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment(moment(new Date(repairman.dateOfBirth || new Date())))
  )
  const [email, setEmail] = useState(repairman.email)
  const [phone, setPhone] = useState(repairman.phone)
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
  const router = useRouter()

  const onHandleUpdate = async (values: FormData) => {
    const data = {
      ...values,
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
      await axios
        .put(`/repairman/${repairman.id}`, {
          ...data,
          avatar: await getBase64(avatar),
        })
        .then((res) => {
          setAvatar(null)
          dispatch(
            pushNotification({
              title: res.data.message,
              description: res.data.description,
              status: NotificationStatus.SUCCESS,
            })
          )
          dispatch(resetNotification())
          router.push(`/admin/repairman/${values.identity}`)
          refresh(values.identity)
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
      await axios
        .put(`/repairman/${repairman.id}`, {
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
          router.push(`/admin/repairman/${values.identity}`)
          refresh(values.identity)
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
    repairman.specializes?.forEach((specialize) => {
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

  function validateIdentity(value: string) {
    let error
    if (!value) {
      error = 'Mã nhân viên không được bỏ trống'
    }
    return error
  }

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Tên không được bỏ trống'
    }
    return error
  }

  function validateUnit(value: string) {
    let error
    if (!value) {
      error = 'Tên đơn vị không được bỏ trống'
    }
    return error
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        identity: repairman.identity,
        name: repairman.name,
        unit: repairman.unit,
      }}
      onSubmit={async (values: FormData, actions: any) => {
        await onHandleUpdate(values)
        actions.setSubmitting(false)
      }}>
      {(props) => (
        <Form>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem colSpan={3}>
              <Field name='identity' validate={validateIdentity}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.identity && form.touched.identity}>
                    <FormLabel htmlFor='identity'>Mã nhân viên</FormLabel>
                    <Input id='identity' {...field} type='text' />
                    <FormErrorMessage>{form.errors?.identity}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='name' validate={validateName}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                    mt='5'>
                    <FormLabel>Tên</FormLabel>
                    <Input {...field} type='text' id='name' />
                    <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='unit' validate={validateUnit}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.unit && form.touched.unit}
                    mt='5'>
                    <FormLabel>Đơn vị</FormLabel>
                    <Input {...field} type='text' id='unit' />
                    <FormErrorMessage>{form.errors?.unit}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                type='submit'
                isLoading={props.isSubmitting}>
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
        </Form>
      )}
    </Formik>
  )
}
