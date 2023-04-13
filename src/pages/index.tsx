import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'

import Container from '@/src/components/layout/Container'
import MyLink from '@/src/components/shared/MyLink'
import { container } from '@/src/container'
import { User } from '@/src/core/entities/user'

type WelcomeProps = { user: User | null }

export default function Welcome({ user }: WelcomeProps) {
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

export const getServerSideProps: GetServerSideProps<WelcomeProps> = async (
  context
) => {
  const token = await getToken({ req: context.req, secret: process.env.SECRET })
  let user: User | null = null

  if (token?.sub) {
    const userResult = await container.getUserById(token?.sub)

    if (userResult.isSuccess) {
      user = userResult.getValue()
    }
  }

  return {
    props: {
      user,
    },
  }
}
