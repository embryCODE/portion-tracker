// noinspection JSUnusedGlobalSymbols

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const requireAuth = ['/settings']

export async function middleware(request: NextRequest) {
  if (requireAuth.some((path) => request.nextUrl.pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    })

    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))

      return NextResponse.redirect(url)
    }
  }

  NextResponse.next()
}
