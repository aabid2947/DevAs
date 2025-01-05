
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, LogOut, MessageSquare, Users, Bell, Search, Home } from 'lucide-react'
import { useAuth } from "../contexts/AuthContext"

export default function Sidebar() {
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Users, label: 'Friends' },
    { icon: Bell, label: 'Notifications' },
    { icon: Search, label: 'Search' },
  ]

  return (
    <Card className="h-screen w-64 bg-[#161920] border-r border-zinc-800">
      <CardContent className="flex flex-col h-full p-0">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border border-zinc-700">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback className="bg-[#1c1f2a]">
                <User className="h-5 w-5 text-zinc-400" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">{user.username}</h2>
              <p className="text-xs text-zinc-400">Online</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100">
            View Profile
          </Button>
        </div>

        <ScrollArea className="flex-grow px-2 py-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
