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
import { useState } from 'react'
import { TFunction } from 'next-i18next'
import UserLayout from '../layouts/UserLayout'
import { withTranslation } from '../../i18n'

function Login({ t }: { readonly t: TFunction }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <UserLayout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Flex align='flex-end'>
        <Image src='/assets/images/login_img_1.svg' maxW='30%' />
        <Spacer />
        <Box maxW='30%'>
          <Text fontSize='3xl' fontWeight='bold' mb={10}>
            Welcome to facility management system
          </Text>
          <FormControl id='email' isRequired mt={5}>
            <FormLabel fontSize='sm'>Email</FormLabel>
            <Input placeholder='Email' fontSize='sm' fontWeight='bold' />
          </FormControl>
          <FormControl id='password' isRequired mt={5}>
            <FormLabel fontSize='sm'>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                fontSize='sm'
                fontWeight='medium'
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
              Remember me
            </Text>
          </Checkbox>
          <Button
            w='100%'
            variant='solid'
            fontWeight='bold'
            size='md'
            mt={5}
            colorScheme='teal'>
            Sign in
          </Button>
        </Box>
        <Spacer />
        <Image src='/assets/images/login_img_2.svg' maxW='30%' />
      </Flex>
    </UserLayout>
  )
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['user-login'],
})

export default withTranslation('user-login')(Login)
