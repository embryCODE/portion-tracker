import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: AuthOptions = {
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
}
export default NextAuth(authOptions)
