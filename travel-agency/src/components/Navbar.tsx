"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"

const whatsappUrl =
  "https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kashmir."

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const lightNavbar = pathname === "/destinations"

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`absolute left-0 top-0 z-50 w-full px-6 py-6 md:px-12 ${
        lightNavbar ? "text-[#27241f]" : "text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={closeMenu}
          className="h-14 w-14 overflow-hidden rounded-full bg-white/80 backdrop-blur-sm"
        >
          <img
            src="/images/logo.jpeg"
            alt="Alpine Dream Holidays"
            className="h-full w-full object-cover"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm transition-opacity hover:opacity-60"
          >
            Home
          </a>

          <a
            href="/destinations"
            className="text-sm transition-opacity hover:opacity-60"
          >
            Destinations
          </a>

          <a
            href="/about"
            className="text-sm transition-opacity hover:opacity-60"
          >
            About Us
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full border px-5 py-2.5 text-sm transition-all ${
              lightNavbar
                ? "border-[#173F3F]/40 hover:bg-[#173F3F] hover:text-white"
                : "border-white/60 hover:bg-white hover:text-black"
            }`}
          >
            WhatsApp us
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              lightNavbar ? "bg-[#e9e2d5]/20" : "bg-black/10"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span
                className={`text-lg font-light leading-none ${
                  lightNavbar ? "text-[#27241f]" : "text-white"
                }`}
              >
                ×
              </span>
            ) : (
              <span className="flex flex-col gap-1">
                <span
                  className={`block h-px w-4 ${
                    lightNavbar ? "bg-[#27241f]" : "bg-white"
                  }`}
                />
                <span
                  className={`block h-px w-4 ${
                    lightNavbar ? "bg-[#27241f]" : "bg-white"
                  }`}
                />
              </span>
            )}
          </button>

          {/* Compact Floating Menu */}
          {menuOpen && (
            <div
              className={`absolute right-0 top-9 w-[110px] rounded-md border p-1 backdrop-blur-md ${
                lightNavbar
                  ? "border-black/10 bg-[#e9e2d5]/20 text-[#27241f]"
                  : "border-white/10 bg-[#173F3F]/20 text-white"
              }`}
            >
              <a
                href="/"
                onClick={closeMenu}
                className="block px-2 py-1.5 text-[8px] leading-none"
              >
                Home
              </a>

              <a
                href="/destinations"
                onClick={closeMenu}
                className="block px-2 py-1.5 text-[8px] leading-none"
              >
                Destinations
              </a>

              <a
                href="/about"
                onClick={closeMenu}
                className="block px-2 py-1.5 text-[8px] leading-none"
              >
                About Us
              </a>

              <div className="my-0.5 border-t border-current/10" />

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={`block whitespace-nowrap rounded px-2 py-1.5 text-[7px] font-medium leading-none ${
                  lightNavbar
                    ? "bg-[#173F3F]/40 text-white"
                    : "bg-white/40 text-[#173F3F]"
                }`}
              >
                WhatsApp us
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
