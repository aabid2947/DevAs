

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, MoreHorizontal, User, GamepadIcon, BookOpen, Music, Code } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { useQuery, useMutation } from "react-query";
import { getFriendList } from "../utils/api"

// Mock hobbies data - in real app, this would come from the API
const mockHobbies = [
  ["Gaming", "Reading", "Music"],
  ["Coding", "Gaming", "Music"],
  ["Reading", "Gaming", "Coding"]
]

const hobbyIcons = {
  Gaming: GamepadIcon,
  Reading: BookOpen,
  Music: Music,
  Coding: Code
}

export default function FriendList() {
  const [friendList,setFriendList] = useState([])

  const { data: friends, isLoading, error } = useQuery(['friendList'], getFriendList,
 {
    onSuccess: (res) => {
      console.log(res.data)
      setFriendList(res.data);
    },
    onError: (err) => {
      console.error("Error fetching friend recommendations:", err);
    },
  });





  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading friend list: {error.message}</p>;
  }

  return (
    <Card className="w-full  bg-[#1F2128] border-zinc-800 border rounded-[20px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-zinc-100">Your Friends</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-100 hover:bg-gradient-to-br from-purple-900 to-purple-700"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {friendList.length > 0 ? (
              friendList.map((friend, index) => (
                <div key={friend._id} className="relative">
                  {/* Background with Skeleton Loading */}
                  <div className="relative h-40 w-full rounded-lg overflow-hidden">
                    <Skeleton className="absolute inset-0">
                      <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" />
                    </Skeleton>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-start justify-between">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                          <User className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-zinc-100">
                            {friend.username}
                          </h4>
                          <p className="text-xs text-zinc-400">Level {index + 1}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>

                    {/* Hobbies */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mockHobbies[index % mockHobbies.length].map((hobby) => {
                        const HobbyIcon = hobbyIcons[hobby]
                        return (
                          <Badge
                            key={hobby}
                            variant="secondary"
                            className="bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80"
                          >
                            {HobbyIcon && <HobbyIcon className="mr-1 h-3 w-3" />}
                            {hobby}
                          </Badge>
                        )
                      })}
                    </div>

                  
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-zinc-500 py-4">
                No Friends available
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

