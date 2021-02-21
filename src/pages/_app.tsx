import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '../theme'
import { appWithTranslation } from '../../i18n'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        rel='stylesheet'
      />
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
