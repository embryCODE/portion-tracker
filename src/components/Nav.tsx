import Container from '@/src/components/Container'
import MyLink from '@/src/components/MyLink'
import { useAuth } from '@/src/hooks/AuthProvider'

export function Nav() {
  const { user } = useAuth()

  return (
    <nav>
      <div className="tw-border-solid tw-border-b-2 tw-border-protein tw-bg-gray-100">
        <Container>
          <div className={'tw-flex tw-justify-between'}>
            <ul className={'tw-flex tw-space-x-4'}>
              <li>
                <MyLink href="/" activeClassName={'tw-font-bold'}>
                  Welcome
                </MyLink>
              </li>

              {user && (
                <>
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
                </>
              )}
            </ul>

            <div className={'tw-flex tw-items-center tw-space-x-4 '}>
              {user ? (
                <>
                  <span className={'tw-text-carbs tw-text-sm'}>
                    {user.email}
                  </span>

                  <MyLink
                    href="/api/auth/signout"
                    activeClassName={'tw-font-bold'}
                  >
                    Sign out
                  </MyLink>
                </>
              ) : (
                <MyLink
                  href="/api/auth/signin"
                  activeClassName={'tw-font-bold'}
                >
                  Sign in
                </MyLink>
              )}
            </div>
          </div>
        </Container>
      </div>
    </nav>
  )
}
