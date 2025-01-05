'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, FileText, User } from 'lucide-react'
import { useAuth } from "../contexts/AuthContext"

export default function UserCard() {
  const { user } = useAuth()

  return (
    <div className="w-full max-w-md">
      <Card className="bg-[#161920] border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-zinc-700">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="bg-[#1c1f2a]">
                  <User className="h-6 w-6 text-zinc-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">{user.username}</h2>
                <p className="text-sm text-zinc-400">Freelance</p>
              </div>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100">
              Connect
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-medium text-zinc-500 mb-2">
                RECRUITED BY
              </h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-zinc-700">
                  <AvatarImage src="/placeholder.svg" alt="Clara Schneider" />
                  <AvatarFallback className="bg-[#1c1f2a]">CS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-zinc-200">Clara Schneider</p>
                  <p className="text-sm text-zinc-400">Freelance</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-zinc-500 mb-2">
                Contact Details
              </h3>
              <div className="space-y-2 text-zinc-300">
                <p className="text-sm">Tel: +49 151 234-56789</p>
                <p className="text-sm">E-Mail: {user.email}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-zinc-500">Notes</h3>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-zinc-300">None</p>
            </div>

            <div>
              <h3 className="text-xs font-medium text-zinc-500 mb-2">
                Documents
              </h3>
              <Card className="bg-purple-900/20 border-purple-800">
                <CardContent className="p-3 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-zinc-200">CV Max.pdf</p>
                    <p className="text-xs text-zinc-400">251 KB</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

