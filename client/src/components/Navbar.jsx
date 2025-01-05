import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageCircle, Search, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { token, user, logout } = useAuth()

  return (
    <nav className="bg-[#161920] border-b border-zinc-800">
      <div className=" px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Search Section */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full bg-[#1c1f2a] border-transparent pl-8 text-sm text-zinc-400 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-600"
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-zinc-400 hover:text-zinc-100"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <Avatar className="h-8 w-8 border border-zinc-700">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback className="bg-[#1c1f2a]">
                      <User className="h-4 w-4 text-zinc-400" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#161920] bg-green-500" />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login"
                  className="text-sm text-zinc-400 hover:text-zinc-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

