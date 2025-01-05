import { React, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "react-query";
import { getFriendRequests, acceptFriendRequest } from "../utils/api";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"


export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);

    const {
      isLoading: isFetching,
      isError,
      error,
    } = useQuery("friendRequests", getFriendRequests, {
      onSuccess: (res) => {
        const recommendations = res.data || [];
        console.log(recommendations.data)
        setFriendRequests(recommendations.data);
      },
      onError: (err) => {
        console.error("Error fetching friend recommendations:", err);
      },
    });

  const { mutate: acceptRequest, isLoading: isAccepting } = useMutation(
    acceptFriendRequest,
    {
      onSuccess: () => {
        alert("Friend request accepted!");
      },
      onError: (err) => {
        console.error("Error accepting friend request:", err.message);
        alert("Failed to accept friend request.");
      },
    }
  );

  const handleAcceptRequest = (requestId) => {
    acceptRequest(requestId);
  };

  return (
    <div className=" bg-[#1F2128] w-full  p-4 rounded-lg max-w-[500px]">
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-zinc-100">
            Friend Requests
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-100 hover:bg-gradient-to-br from-purple-900 to-purple-700"

          >
            <MoreHorizontal className="h-5 w-5" />
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
            {friendRequests.map((req) => (
              <div
                key={req.sender._id}
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
                        {req.sender.username}
                      </span>
                      {req.senderName && (
                        <Badge
                          variant="secondary"
                          className="h-4 w-4 bg-blue-500/20 text-blue-400"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">{req.senderEmail}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleAcceptRequest(req._id)}
                  className="bg-gradient-to-br from-purple-900 to-purple-700 hover:bg-purple-700 text-white text-xs px-4 h-8"
                  disabled={isAccepting}
                >
                  Accept
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500">
            No Friend Requests found
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
