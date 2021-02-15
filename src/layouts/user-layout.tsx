import { Box, Container } from '@chakra-ui/react'
import UserHeader from '../components/layouts/user-header'

/* eslint-disable react/destructuring-assignment */
export default function UserLayout(props: any) {
  return (
    <Box>
      <UserHeader />
      <Container maxW='100%' centerContent py={5}>
        <Box w='90%'>{props.children}</Box>
      </Container>
    </Box>
  )
}
