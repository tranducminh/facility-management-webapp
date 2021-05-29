import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function AdminLogo() {
  return (
    <Link href='/admin'>
      <Flex align='center' cursor='pointer'>
        <Text
          fontSize='5xl'
          fontWeight='black'
          color='#319795'
          fontFamily='Inter'>
          F
        </Text>
        {/* <Text fontSize='3xl' fontWeight='black' color='#319795'>
          acility
        </Text> */}
        <Text fontSize='4xl' fontWeight='black'>
          s |
        </Text>
        <Text fontSize='3xl' fontWeight='black' color='#319795'>
          | Quản lý
        </Text>
      </Flex>
    </Link>
  )
}
