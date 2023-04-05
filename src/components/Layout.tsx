import Head from 'next/head'
import { ReactNode } from 'react'

import Container from '@/src/components/Container'
import MyLink from '@/src/components/MyLink'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Portion Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'tw-absolute tw-inset-0 tw-h-full tw-flex tw-flex-col'}>
        <nav>
          <div className="tw-border-solid tw-border-b-2 tw-border-protein">
            <Container>
              <ul className={'tw-flex tw-space-x-4'}>
                <li>
                  <MyLink href="/" activeClassName={'tw-font-bold'}>
                    Welcome
                  </MyLink>
                </li>

                <li>
                  <MyLink href="/tracker" activeClassName={'tw-font-bold'}>
                    Tracker
                  </MyLink>
                </li>

                <li>
                  <MyLink href="/settings" activeClassName={'tw-font-bold'}>
                    Settings
                  </MyLink>
                </li>
              </ul>
            </Container>
          </div>
        </nav>

        <main className={'tw-flex-1'}>{children}</main>

        <footer>
          <div className="tw-border-solid tw-border-t-2 tw-border-protein">
            <Container>
              <div className="tw-flex tw-justify-between">Footer</div>
            </Container>
          </div>
        </footer>
      </div>
    </>
  )
}