import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import AdminHeader from './components/AdminHeader'

/* eslint-disable react/destructuring-assignment */
export default function EmployeeLayout(props: any) {
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/logo-light.png' />
      </Head>
      <AdminHeader />
      <Container maxW='100%' centerContent py={5}>
        <Box w='85%'>{props.children}</Box>
      </Container>
    </Box>
  )
}
