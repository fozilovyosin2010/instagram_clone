import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // here make auth guard
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("auth_token") || "";

  if (path === "/login" && token)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (path !== "/login" && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"],
};
