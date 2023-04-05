import '@/src/styles/globals.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

import Layout from '@/src/components/Layout'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
