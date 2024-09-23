import { NextResponse } from "next/server";
import { logger } from "@/utils/logger"; // Assuming you have a logger utility
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Log the request path and method
  logger.info(`Request URL: ${pathname}, Method: ${request.method}`);
  const token = await getToken({ req: request });
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Authentication check example: Blocking all access to `/admin` unless authenticated
//   if (pathname.startsWith("/")) {
//     const authToken = request.cookies.get("authToken");

//     if (!authToken) {
//       // If not authenticated, redirect to login page
//       return NextResponse.redirect(new URL("/login", request.url));
//     } else {
//     }
//   }

  // Continue the request if no issues
  return NextResponse.next();
}

// Define the routes where middleware should run
export const config = {
  matcher: ["/login","/signup","/admin/:path*", "/dashboard/:path*"], // Apply middleware to these routes
};
