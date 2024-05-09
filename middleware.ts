import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname === "/admin")
    return NextResponse.redirect(new URL("/admin/statistical", req.url));
  if (pathname === "/auth")
    return NextResponse.redirect(new URL("/auth/login", req.url));
  if (pathname === "/admin/libraries")
    return NextResponse.redirect(
      new URL("/admin/libraries/categories-management", req.url)
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
