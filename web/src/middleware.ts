import { NextRequest, NextResponse } from "next/server"
import { Paths } from "./config/consts"

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 * */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === Paths.HOME) {
    return NextResponse.redirect(new URL(Paths.USERS, req.url))
  }
  return NextResponse.next()
}
