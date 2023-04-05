// noinspection JSUnusedGlobalSymbols

import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const requireAuth = ['/settings']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  if (requireAuth.some((path) => pathname.startsWith(path))) {
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

  return res
}
