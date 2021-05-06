import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import RepairmanHeader from './components/RepairmanHeader'

/* eslint-disable react/destructuring-assignment */
export default function RepairmanLayout(props: any) {
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/logo-light.png' />
      </Head>
      <RepairmanHeader />
      <Container maxW='100%' centerContent py={5}>
        <Box w='85%'>{props.children}</Box>
      </Container>
    </Box>
  )
}
