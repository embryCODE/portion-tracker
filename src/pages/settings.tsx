import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'

import { authOptions } from '@/src/pages/api/auth/[...nextauth]'

import { User } from '.prisma/client'

const prisma = new PrismaClient()

type DisplayUser = Partial<User>

export default function Settings({ user }: { user: DisplayUser }) {
  return (
    <>
      Signed in as {JSON.stringify(user, null, 2)} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  user?: DisplayUser
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
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
