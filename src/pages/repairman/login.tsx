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
import RepairmanLayout from '../../layouts/EmployeeLayout'
import { withTranslation } from '../../../i18n'
import { loginRepairman } from '../../redux/actions/auth.action'

function Login({ t }: { readonly t: TFunction }) {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [identity, setIdentity] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleClick = () => setShow(!show)

  const onHandleLogin = () => {
    dispatch(loginRepairman({ identity, password }))
  }

  useEffect(() => {
    if (auth.isAuth) {
      router.push('/repairman/tasks')
    }
  }, [auth])

  return (
    <RepairmanLayout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Flex align='flex-end'>
        <Image src='/assets/images/login_img_1.svg' maxW='30%' />
        <Spacer />
        <Box maxW='30%'>
          <Text fontSize='3xl' fontWeight='bold' mb={10}>
            Chào mừng đến với hệ thống quản lý cơ sở vật chất
          </Text>
          <FormControl id='email' isRequired mt={5}>
            <FormLabel fontSize='sm'>Mã nhân viên</FormLabel>
            <Input
              placeholder='Mã nhân viên'
              fontSize='sm'
              fontWeight='bold'
              onChange={(event) => setIdentity(event.target.value)}
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
                fontWeight='medium'
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
    </RepairmanLayout>
  )
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['user-login'],
})

export default withTranslation('user-login')(Login)
