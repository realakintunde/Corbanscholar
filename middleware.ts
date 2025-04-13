import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/admin"]
const adminRoutes = ["/admin"]

// Session expiry time in seconds (1 week)
const SESSION_EXPIRY = 7 * 24 * 60 * 60

export async function middleware(request: NextRequest) {
  try {
    // Add a custom header to identify server-side requests
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-is-server-side", "1")

    const sessionId = request.cookies.get("session_id")?.value
    const path = request.nextUrl.pathname

    // Check if the route requires authentication
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))

    // If not a protected route and not an API route, proceed normally
    if (!isProtectedRoute && !path.startsWith("/api/")) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    // If no session, redirect to login
    if (!sessionId && isProtectedRoute) {
      const url = new URL("/login", request.url)
      // Properly encode the redirect path to avoid issues with special characters
      url.searchParams.set("redirect", encodeURIComponent(path))
      return NextResponse.redirect(url)
    }

    // For admin routes, verify admin role
    if (isAdminRoute && sessionId) {
      try {
        // Use relative URL to avoid issues with different environments
        const response = await fetch(`${new URL("/api/auth/me", request.url).toString()}`, {
          headers: {
            Cookie: `session_id=${sessionId}`,
          },
        })

        if (!response.ok) {
          const url = new URL("/login", request.url)
          url.searchParams.set("redirect", encodeURIComponent(path))
          return NextResponse.redirect(url)
        }

        const data = await response.json()
        if (data.user?.role !== "admin") {
          return NextResponse.redirect(new URL("/", request.url))
        }
      } catch (error) {
        console.error("Error verifying admin role:", error)
        // On error, redirect to login instead of crashing
        const url = new URL("/login", request.url)
        url.searchParams.set("redirect", encodeURIComponent(path))
        return NextResponse.redirect(url)
      }
    }

    // Extend session if it exists
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Refresh the session cookie to prevent expiration
    if (sessionId) {
      response.cookies.set({
        name: "session_id",
        value: sessionId,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: SESSION_EXPIRY,
      })
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // Return a basic response to prevent the application from crashing
    return NextResponse.next()
  }
}

// Update the matcher to be more specific and exclude static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * Only run middleware on API routes and protected routes
     */
    "/api/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
}
