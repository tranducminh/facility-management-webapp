import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import Title from '../../../components/Title'
import axios from '../../../utils/axios'
import {
  pushNotification,
  resetNotification,
} from '../../../redux/actions/notification.action'
import { NotificationStatus } from '../../../redux/types/notification.type'

type FormData = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export default function Security() {
  const dispatch = useDispatch()
  const [newPassword, setNewPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  function validateOldPassword(value: string) {
    let error
    if (!value) {
      error = 'Mật khẩu hiện tại không được bỏ trống'
    }
    return error
  }

  function validateNewPassword() {
    let error
    if (!newPassword) {
      error = 'Mật khẩu mới không được bỏ trống'
    }
    return error
  }

  const validateConfirmNewPassword = (value: string) => {
    let error
    if (!value) {
      error = 'Mật khẩu không được bỏ trống'
    } else if (value !== newPassword) {
      error = 'Mật khẩu nhập lại không trùng khớp'
    }
    return error
  }

  return (
    <AdminDashboard isSecurity title='Bảo mật'>
      <Title title='Đổi mật khẩu' />
      <Box w='50%'>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={(values: FormData, actions: any) => {
            axios
              .put('/admins/change-password', {
                oldPassword: values.oldPassword,
                newPassword,
              })
              .then((res) => {
                setNewPassword('')
                actions.setSubmitting(false)
                actions.resetForm()
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
                actions.setSubmitting(false)
                dispatch(
                  pushNotification({
                    title: error.response.data.message,
                    description: error.response.data.description,
                    status: NotificationStatus.ERROR,
                  })
                )
                dispatch(resetNotification())
              })
          }}>
          {(props) => (
            <Form>
              <Field name='oldPassword' validate={validateOldPassword}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.oldPassword && form.touched.oldPassword
                    }
                    mt='5'>
                    <FormLabel fontSize='sm'>Mật khẩu hiện tại</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder='Mật khẩu hiện tại'
                        fontSize='sm'
                        fontWeight='medium'
                        {...field}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button
                          h='1.75rem'
                          size='xs'
                          onClick={() => {
                            setShowOldPassword(!showOldPassword)
                          }}>
                          {showOldPassword ? 'Ẩn' : 'Hiển thị'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors?.oldPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='newPassword' validate={validateNewPassword}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.newPassword && form.touched.newPassword
                    }
                    mt='5'>
                    <FormLabel fontSize='sm'>Mật khẩu mới</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder='Mật khẩu mới'
                        fontSize='sm'
                        fontWeight='medium'
                        {...field}
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button
                          h='1.75rem'
                          size='xs'
                          onClick={() => {
                            setShowNewPassword(!showNewPassword)
                          }}>
                          {showNewPassword ? 'Ẩn' : 'Hiển thị'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors?.newPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field
                name='confirmNewPassword'
                validate={validateConfirmNewPassword}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.confirmNewPassword &&
                      form.touched.confirmNewPassword
                    }
                    mt='5'>
                    <FormLabel fontSize='sm'>Nhập lại mật khẩu mới</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        placeholder='Nhập lại mật khẩu mới'
                        fontSize='sm'
                        fontWeight='medium'
                        {...field}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button
                          h='1.75rem'
                          size='xs'
                          onClick={() => {
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }}>
                          {showConfirmNewPassword ? 'Ẩn' : 'Hiển thị'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors?.confirmNewPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                w='100%'
                variant='solid'
                fontWeight='bold'
                size='md'
                mt={5}
                colorScheme='teal'
                type='submit'
                isLoading={props.isSubmitting}>
                Cập nhật mật khẩu
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </AdminDashboard>
  )
}
