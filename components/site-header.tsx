"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between text-blue-900">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/corban-scholar-logo.png"
              alt="CorbanScholar Logo"
              width={180}
              height={50}
              className="h-auto w-auto max-h-10 md:max-h-12"
              priority
            />
            <span className="sr-only">CorbanScholar</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/search" className="text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
            Search
          </Link>
          <Link href="/resources" className="text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
            Resources
          </Link>
          <Link href="/community" className="text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
            Community
          </Link>
          <Link href="/about" className="text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
            Contact
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="container py-3 flex flex-col gap-2">
            <Link
              href="/search"
              className="px-2 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/resources"
              className="px-2 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/community"
              className="px-2 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/about"
              className="px-2 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-2 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-2 mt-2 pt-2 border-t">
              <Link href="/login" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
