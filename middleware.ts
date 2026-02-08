import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CustomJwtPayload {
  id: string;
  type: string;
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("accessToken");

  // Only protect dashboard and protected-routes paths
  const protectedPaths = ["/dashboard", "/protected-routes"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  // No token → redirect to login with redirect param
  if (!token || !token.value) {
    const redirectUrl = new URL("/auth/login", request.url);
    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    redirectUrl.searchParams.set("redirect", fullPath);
    const response = NextResponse.redirect(redirectUrl);
    // Ensure cookie is deleted
    response.cookies.delete("accessToken");
    return response;
  }

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token.value);

    // Check token expiration
    if (Date.now() >= decoded.exp * 1000) {
      const redirectUrl = new URL("/auth/login", request.url);
      const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      redirectUrl.searchParams.set("redirect", fullPath);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("accessToken");
      return response;
    }

    // ✅ Token valid → allow access
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    const redirectUrl = new URL("/auth/login", request.url);
    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    redirectUrl.searchParams.set("redirect", fullPath);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected-routes/:path*"],
};
