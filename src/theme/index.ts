import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Button from './components/button'
import textStyles from './foundations/text-style'

const theme = extendTheme({
  ...defaultTheme,
  styles: {
    global: (props) => ({
      body: {
        color: mode('#2d3748', '#ffffffeb')(props),
        fontFamily: "'Quicksand', sans-serif",
        backgroundColor: mode('#ffffff', 'gray.800')(props),
        fontSize: 'sm',
      },
    }),
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
