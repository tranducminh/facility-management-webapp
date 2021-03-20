import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import ManagerHeader from './components/ManagerHeader'

/* eslint-disable react/destructuring-assignment */
export default function ManagerLayout(props: any) {
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/poster.png' />
      </Head>
      <ManagerHeader />
      <Container maxW='100%' centerContent py={5}>
        <Box w='85%'>{props.children}</Box>
      </Container>
    </Box>
  )
}
