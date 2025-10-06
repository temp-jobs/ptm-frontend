'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // Get user from localStorage (set after login)
    const storedUser = localStorage.getItem('parttimematch_user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!mounted) return null

  

  const handleLogout = () => {
    localStorage.removeItem('parttimematch_token')
    localStorage.removeItem('parttimematch_user')
    setUser(null)
    setDropdownOpen(false)
    // Optionally redirect to home page
    window.location.href = '/'
  }

  // Determine nav links based on role
  const navLinks = [
    { href: '/jobs', label: 'Find Jobs', show: user?.role === 'job_seeker' },
    { href: '/post-job', label: 'Post Job', show: user?.role === 'employer' || !user },
    { href: '/about', label: 'About', show: true },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              PartTimeMatch
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(
              (link) =>
                link.show && (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                )
            )}
          </div>

          {/* Right-side controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* Profile Avatar */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                // onBlur={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user.photoUrl || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <span className="hidden sm:block font-medium">{user.name || 'Profile'}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50"
                    onBlur={() => setDropdownOpen(false)}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false)
                      }}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
