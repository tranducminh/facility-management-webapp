import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Button,
  Box,
  Flex,
  Spacer,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import AdminLayout from '../../layouts/AdminLayout'
import { loginAdmin } from '../../redux/actions/auth.action'

type FormData = {
  email: string
  password: string
}

function AdminLogin() {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const router = useRouter()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const onHandleLogin = (data: FormData) => {
    dispatch(loginAdmin({ ...data }))
  }

  useEffect(() => {
    if (auth.isAuth) {
      router.push('/admin/buildings')
    }
  }, [auth])

  function validateEmail(value: string) {
    let error
    if (!value) {
      error = 'Email không được bỏ trống'
    }
    return error
  }

  function validatePassword(value: string) {
    let error
    if (!value) {
      error = 'Mật khẩu không được bỏ trống'
    }
    return error
  }

  return (
    <AdminLayout title='Quản lý | Đăng nhập'>
      <Flex align='center' h='100%'>
        <Image src='/assets/images/login_img_1.svg' maxW='30%' />
        <Spacer />
        <Box maxW='30%'>
          <Text fontSize='3xl' fontWeight='bold'>
            Chào mừng đến với
          </Text>
          <Text fontSize='3xl' fontWeight='bold' mb={10}>
            Hệ thống quản lý cơ sở vật chất
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values: FormData, actions: any) => {
              await onHandleLogin(values)
              actions.setSubmitting(false)
            }}>
            {() => (
              <Form>
                <Field name='email' validate={validateEmail}>
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                      mt='5'>
                      <FormLabel fontSize='sm'>Email</FormLabel>
                      <Input
                        placeholder='Email'
                        fontSize='sm'
                        fontWeight='bold'
                        {...field}
                      />
                      <FormErrorMessage>{form.errors?.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password' validate={validatePassword}>
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.password && form.touched.password}
                      mt='5'>
                      <FormLabel fontSize='sm'>Mật khẩu</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='Mật khẩu'
                          fontSize='sm'
                          fontWeight='medium'
                          {...field}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='xs' onClick={handleClick}>
                            {show ? 'Ẩn' : 'Hiển thị'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors?.password}
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
                  isLoading={auth.isLoading}>
                  Đăng nhập
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Spacer />
        <Image src='/assets/images/login_img_2.svg' maxW='30%' />
      </Flex>
    </AdminLayout>
  )
}

export default AdminLogin
