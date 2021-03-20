import { Flex, Text } from '@chakra-ui/react'
import { Link } from '../../i18n'

export default function ManagerLogo() {
  return (
    <Link href='/manager/rooms'>
      <Flex align='center' cursor='pointer'>
        <Text
          fontSize='5xl'
          fontWeight='black'
          color='#319795'
          fontFamily='Inter'>
          F
        </Text>
        <Text fontSize='3xl' fontWeight='black' color='#319795'>
          acility
        </Text>
        <Text fontSize='3xl' fontWeight='black'>
          system |
        </Text>
        <Text fontSize='3xl' fontWeight='black'>
          | Building A1
        </Text>
      </Flex>
    </Link>
  )
}
