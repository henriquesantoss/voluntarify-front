import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toast } from 'components/Toast'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import { theme } from 'styles/theme/main'
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Voluntarify</title>
      </Head>
      <Toast />
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
