/* eslint-disable @typescript-eslint/ban-types */
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
  FormErrorMessage,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import axios from '../../../../utils/axios'
import { getBase64 } from '../../../../utils/file'
import { EMPLOYEE } from '../../../../types'

type FormData = {
  identity?: string
  name?: string
  unit?: string
}

export default function EmployeeDetail({
  employee,
  refresh,
}: {
  employee: EMPLOYEE
  refresh: Function
}) {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment(new Date(employee.dateOfBirth || new Date()))
  )

  const [email, setEmail] = useState(employee.email)
  const [phone, setPhone] = useState(employee.phone)
  const [avatar, setAvatar] = useState<File | null>()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const router = useRouter()
  const onHandleUpdate = async (data: FormData) => {
    if (avatar) {
      await axios
        .put(`/employees/${employee.id}`, {
          ...data,
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
          avatar: await getBase64(avatar),
        })
        .then(() => {
          router.push(`/admin/employees/${data.identity}`)
          refresh(data.identity)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      await axios
        .put(`/employees/${employee.id}`, {
          ...data,
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
        })
        .then(() => {
          router.push(`/admin/employees/${data.identity}`)
          refresh(data.identity)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setEmail(employee.email)
    setPhone(employee.phone)
    setAvatarUrl(employee.avatar)
    handleDateChange(moment(new Date(employee.dateOfBirth || new Date())))
  }, [employee])

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
        identity: employee.identity,
        name: employee.name,
        unit: employee.unit,
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
                type='submit'
                isLoading={props.isSubmitting}>
                Cập nhật thay đổi
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
        </Form>
      )}
    </Formik>
  )
}
