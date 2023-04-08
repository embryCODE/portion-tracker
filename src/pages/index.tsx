import Container from '@/src/components/layout/Container'
import MyLink from '@/src/components/shared/MyLink'
import { useAuth } from '@/src/hooks/AuthProvider'

export default function Welcome() {
  const { user, isLoading } = useAuth()

  if (isLoading) return

  return (
    <Container isProse={true}>
      <h1>Portion Tracker</h1>

      <p>
        This is a simple app to help you track your daily protein, carbs, and
        fat portions, using your hands as a guide.
      </p>

      {user ? (
        <p>
          Be sure to set your plan in{' '}
          <MyLink href={'/settings'}>settings</MyLink>, then visit the{' '}
          <MyLink href={'/tracker'}>tracker.</MyLink>
        </p>
      ) : (
        <p>
          Please <MyLink href={'/api/auth/signin'}>sign in</MyLink> to get
          started.
        </p>
      )}
    </Container>
  )
}
