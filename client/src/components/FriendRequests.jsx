

import { React, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation } from "react-query"
import { getFriendRequests, acceptFriendRequest } from "../utils/api"
import { User, MoreVertical } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([])

  const { isLoading: isFetching, isError, error } = useQuery(
    "friendRequests",
    getFriendRequests,
    {
      onSuccess: (res) => {
        setFriendRequests(res.data.data)
      },
      onError: (err) => {
        console.error("Error fetching friend requests:")
      },
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const { mutate: acceptRequest, isLoading: isAccepting } = useMutation(
    acceptFriendRequest,
    {
      onSuccess: () => {
        alert("Friend request accepted!")
        refetch()
      },
      onError: (err) => {
        console.error("Error accepting friend request:", err.message)
        alert("Failed to accept friend request.")
      },
    }
  )

  const handleAcceptRequest = (requestId) => {
    acceptRequest(requestId)
  }

  return (
    <div className="w-full max-w-md p-4 bg-[#161920] rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-zinc-200">Friend Requests</h3>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-300">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        {isFetching ? (
          <div className="text-center text-zinc-500">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-400">
            Error fetching friend requests.
          </div>
        ) : friendRequests.length > 0 ? (
          <div className="space-y-4">
            {friendRequests.map((sender) => (
              <div
                key={sender._id}
                className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-[#1c1f2a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-800">
                    <AvatarFallback className="bg-[#1c1f2a]">
                      <User className="h-4 w-4 text-zinc-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-200">
                        {sender.sender.username}
                      </span>
                      {sender.sender.verified && (
                        <Badge variant="secondary" className="h-4 w-4 bg-blue-500/20 text-blue-400">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">
                      Super Active
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleAcceptRequest(sender._id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 h-8"
                  disabled={isAccepting}
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500">
            No Friend Request found
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

