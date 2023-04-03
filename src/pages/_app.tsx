import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { wrapper } from '@/core/store'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)
