import { NextResponse, NextRequest } from 'next/server'
import { INITIAL_PAGE } from './src/constants/routes'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname == '/') {
    return NextResponse.redirect(new URL(INITIAL_PAGE, request.url))
  }
  return NextResponse.next()
}
