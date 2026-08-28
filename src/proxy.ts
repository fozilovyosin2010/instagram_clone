import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/login" || path === "/register";

  const token = request.cookies.get("auth_token") || "";

  if (isAuthPage && token)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (isAuthPage && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  const obj = { great: "hello" };
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/"],
};
