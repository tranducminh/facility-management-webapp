import { useColorModeValue } from '@chakra-ui/react'

export function useColor() {
  return {
    buttonColorMode: useColorModeValue('gray.500', 'gray.300'),
    hoverTextColor: useColorModeValue('teal.700', 'teal.200'),
    hoverBgColor: useColorModeValue('#e6fffa', '#308c7a4d'),
    selectBgColor: useColorModeValue('#e6fffa', '#308c7a4d'),
  }
}
