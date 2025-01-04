import { React, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useMutation } from "react-query";
import { getFriendRequests, acceptFriendRequest } from "../utils/api";
import { User } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);

  // Query to fetch friend requests
  const { isLoading: isFetching, isError, error } = useQuery(
    "friend",
    getFriendRequests,
    {
      onSuccess: (res) => {
        setFriendRequests(res.data.data);
  
      },
      onError: (err) => {
        console.error("Error fetching friend requests:");
      },
      enabled: false, // Disable automatic execution
      refetchOnWindowFocus: false, // Disable refetching when the window regains focus
      refetchOnReconnect: false, // Disable refetching when the network reconnects
    }
  );

  // Mutation to accept friend requests
  const { mutate: acceptRequest, isLoading: isAccepting } = useMutation(
    acceptFriendRequest,
    {
      onSuccess: () => {
        alert("Friend request accepted!");
        // Refetch friend requests after accepting one
       // Refetch friend requests after accepting one
       refetch(); // This will refresh the list of friend requests
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
    <div className="lg:col-span-3 space-y-6">
      <h3 className="font-medium text-sm text-gray-500">Friend Requests</h3>

      <div className="w-full max-w-sm mx-auto bg-background rounded-lg border">
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {isFetching ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : isError ? (
              <div className="text-center text-red-500">
                Error fetching friend requests.
              </div>
            ) : friendRequests.length > 0 ? (
              friendRequests.map((sender) => (
                <div
                  key={sender._id}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="relative flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium ">  
                        {sender.sender.username}
                      </span>
                      {sender.sender.email && (
                        <span className="text-xs text-muted-foreground">
                          {sender.sender.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAcceptRequest(sender._id)}
                    className="text-green-500 hover:text-green-600"
                    title="Accept Friend Request"
                    disabled={isAccepting}
                  >
                    <FaCheckCircle size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No friend requests found
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
