import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
}
export default NextAuth(authOptions)
