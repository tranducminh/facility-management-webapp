import { Box, Container, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useSelector, RootStateOrAny } from 'react-redux'
import { useEffect } from 'react'
import AdminHeader from './components/AdminHeader'

/* eslint-disable react/destructuring-assignment */
export default function AdminLayout(props: any) {
  const toast = useToast()
  const notification = useSelector(
    (state: RootStateOrAny) => state.notification
  )

  useEffect(() => {
    if (notification.isEnabled) {
      toast({
        title: notification.title,
        description: notification.description,
        status: notification.status,
        position: 'bottom-left',
        duration: 3000,
        isClosable: true,
      })
    }
  }, [notification])
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/logo-light.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='description' content={props?.description} />
        <title>
          {props?.title ||
            'Hệ thống quản lý cơ sở vật chất Học viện Quốc gia Hồ Chí Minh'}
        </title>
      </Head>
      <AdminHeader />
      <Container maxW='100%' centerContent py={5}>
        <Box w='85%'>{props.children}</Box>
      </Container>
    </Box>
  )
}
