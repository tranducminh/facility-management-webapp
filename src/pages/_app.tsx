import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import store from '../redux/store'
import theme from '../theme'
import '../styles/pagination.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../styles/date-picker-custom.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
})
const makeStore = () => store
export default withRedux(makeStore)(MyApp)
