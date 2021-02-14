import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '../theme'
import { appWithTranslation } from '../../i18n'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
