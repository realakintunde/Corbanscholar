"use client"

import type React from "react"

import { useEffect } from "react"

export function ErrorBoundary({
  children,
  fallback = <div className="p-4">Something went wrong. Please try refreshing the page.</div>,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught in error boundary:", event.error)
      // You could also report to an error tracking service here
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  return <>{children}</>
}
