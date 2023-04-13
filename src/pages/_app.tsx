import '@/src/styles/globals.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import Layout from '@/src/components/layout/Layout'
import { AuthProvider } from '@/src/providers/AuthProvider'
import { UiStateProvider } from '@/src/providers/UiStateProvider'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <UiStateProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </UiStateProvider>
    </SessionProvider>
  )
}
