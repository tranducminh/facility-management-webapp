import { useColorModeValue } from '@chakra-ui/react'

export function useColor() {
  return {
    buttonColor: useColorModeValue('gray.500', 'gray.300'),
  }
}
