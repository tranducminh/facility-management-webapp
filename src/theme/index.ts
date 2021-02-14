import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

const theme = extendTheme({
  ...defaultTheme,
  colors: {
    main: '#06122d',
  },
})

export default theme
