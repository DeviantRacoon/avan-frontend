import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/auth'];

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get('sessionToken')?.value || null;
  const pathname = nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some((publicPath) =>
    pathname === publicPath || pathname.startsWith(`${publicPath}/`)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|auth|api|images|uploads|assets|public|static).*)',
  ],
};
