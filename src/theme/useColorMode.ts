import { useColorModeValue } from '@chakra-ui/react'

export function useColor() {
  return {
    buttonColorMode: useColorModeValue('gray.500', 'gray.300'),
  }
}
