/* eslint-disable no-unused-vars */
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols

import NextAuth from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string | null
      email: string | null
      image: string | null
      id: string
    }
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}

  /** The OAuth profile returned from your provider */
  interface Profile {}
}
