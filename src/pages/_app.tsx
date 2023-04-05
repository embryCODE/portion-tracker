import '@/src/styles/globals.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{ session: Session }>) {
  return <Component {...pageProps} />
}
