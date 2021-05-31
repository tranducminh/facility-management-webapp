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
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import RepairmanLayout from '../../layouts/EmployeeLayout'
import { loginRepairman } from '../../redux/actions/auth.action'

type FormData = {
  identity: string
  password: string
}
function Login() {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const router = useRouter()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const onHandleLogin = (data: FormData) => {
    dispatch(loginRepairman({ ...data }))
  }

  useEffect(() => {
    if (auth.isAuth) {
      router.push('/repairman/tasks')
    }
  }, [auth])

  function validateIdentity(value: string) {
    let error
    if (!value) {
      error = 'Mã nhân viên không được bỏ trống'
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
    <RepairmanLayout title='Kỹ thuật viên | Đăng nhập'>
      <Flex align='flex-end'>
        <Image src='/assets/images/login_img_1.svg' maxW='30%' />
        <Spacer />
        <Box maxW='30%'>
          <Text fontSize='3xl' fontWeight='bold' mb={10}>
            Chào mừng đến với hệ thống quản lý cơ sở vật chất
          </Text>
          <Formik
            initialValues={{
              identity: '',
              password: '',
            }}
            onSubmit={async (values: FormData, actions: any) => {
              await onHandleLogin(values)
              actions.setSubmitting(false)
            }}>
            {() => (
              <Form>
                <Field name='identity' validate={validateIdentity}>
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.identity && form.touched.identity}
                      mt='5'>
                      <FormLabel fontSize='sm'>Mã nhân viên</FormLabel>
                      <Input
                        placeholder='Mã nhân viên'
                        fontSize='sm'
                        fontWeight='bold'
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors?.identity}
                      </FormErrorMessage>
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
                <Checkbox size='md' colorScheme='teal' defaultChecked mt={5}>
                  <Text fontSize='sm' fontWeight='medium'>
                    Ghi nhớ tài khoản
                  </Text>
                </Checkbox>
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
    </RepairmanLayout>
  )
}

export default Login
