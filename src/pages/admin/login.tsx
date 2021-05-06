import Head from 'next/head'
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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { TFunction } from 'next-i18next'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../layouts/AdminLayout'
import { loginAdmin } from '../../redux/actions/auth.action'

function AdminLogin() {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleClick = () => setShow(!show)

  const onHandleLogin = () => {
    dispatch(loginAdmin({ email, password }))
  }

  useEffect(() => {
    if (auth.isAuth) {
      router.push('/admin/buildings')
    }
  }, [auth])

  return (
    <AdminLayout>
      <Flex align='flex-end'>
        <Image src='/assets/images/login_img_1.svg' maxW='30%' />
        <Spacer />
        <Box maxW='30%'>
          <Text fontSize='3xl' fontWeight='bold'>
            Chào mừng đến với
          </Text>
          <Text fontSize='3xl' fontWeight='bold' mb={10}>
            Hệ thống quản lý cơ sở vật chất
          </Text>
          <FormControl id='email' isRequired mt={5}>
            <FormLabel fontSize='sm'>Email</FormLabel>
            <Input
              placeholder='Email'
              fontSize='sm'
              fontWeight='bold'
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id='password' isRequired mt={5}>
            <FormLabel fontSize='sm'>Mật khẩu</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Mật khẩu'
                fontSize='sm'
                fontWeight='bold'
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='xs' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
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
            onClick={onHandleLogin}>
            Đăng nhập
          </Button>
        </Box>
        <Spacer />
        <Image src='/assets/images/login_img_2.svg' maxW='30%' />
      </Flex>
    </AdminLayout>
  )
}

export default AdminLogin
