import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { signOut } from 'next-auth/react'

const secret = process.env.NEXTAUTH_SECRET

const prisma = new PrismaClient()

type DisplayUser = {
  name: string | null
  email: string | null
  image: string | null
}

export default function Settings({ user }: { user: DisplayUser }) {
  return (
    <>
      Signed in as {JSON.stringify(user, null, 2)} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  user: DisplayUser
}> = async ({ req }) => {
  const token = await getToken({ req, secret })

  // We will always have a token here, due to middleware, but leaving this
  // here just in case.
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token.sub,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  })

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}
