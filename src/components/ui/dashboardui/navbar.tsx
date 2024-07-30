"use client"

import { useState } from "react"
import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Settings } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="bg-white-500 min-h-[10vh] flex flex-wrap justify-between items-center p-4 rounded-sm w-full shadow-sm">
      <div className="flex items-center justify-between w-full md:w-auto">
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 gap-2`}>
        <Button variant={pathname === '/settings' ? 'default': 'outline'} asChild className="w-full md:w-auto">
          <Link href='/settings' className="flex items-center justify-center gap-2">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </Button>
        
        <UserButton />
      </div>
    </div>
  )
}