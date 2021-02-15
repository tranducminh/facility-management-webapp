import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'
import Button from './components/button'
import textStyles from './foundations/text-style'

const theme = extendTheme({
  ...defaultTheme,
  fonts: {
    body: "'Quicksand', sans-serif",
  },
  colors: {
    main: '#06122d',
  },
  fontSizes: {
    sm: '15px',
  },
  textStyles,
  components: {
    Button,
  },
})

export default theme
