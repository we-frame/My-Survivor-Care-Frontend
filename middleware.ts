import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access-token");
  const path = request.nextUrl.pathname;

  // Array of all routes that are protected
  const protectedRoutes = [
    "/consumer-resources",
    "/practitioner-resources",
    "/healthcare-professional",
    "/profile",
    "/download-result",
    "/re-assessment",
  ];

  // Array of all routes that are public
  // const publicRoutes = ["/orders/inperson", "/orders/success"];

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.pathname);

  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access a protected route without an access token
  if (
    !accessToken &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  // Redirect to home if logged in and trying to access login or register
  if (accessToken && path === "/login") {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
