"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NavigationProps {
  currentSection: "home" | "gallery" | "upload" | "share"
  onNavigate: (section: "home" | "gallery" | "upload" | "share") => void
}

export default function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home" as const, label: "Home" },
    { id: "gallery" as const, label: "Gallery" },
    { id: "upload" as const, label: "Try It" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="flex items-center justify-between h-14 bg-black/70 backdrop-blur-md border border-[#00ff88]/20 rounded-2xl px-4">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[#00ff88]/30 bg-black/50">
              <Image
                src="/images/tag-logo.png"
                alt="TAG Logo"
                width={20}
                height={20}
                className="rounded-full"
                priority
              />
            </span>
            <span className="text-white font-bold tracking-wide group-hover:text-[#00ff88] transition-colors">TAG</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  currentSection === item.id ? "text-[#00ff88]" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff88] animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#00ff88] hover:bg-[#00ff88]/10 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-[#00ff88]/20 animate-in slide-in-from-top">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all ${
                  currentSection === item.id
                    ? "bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
