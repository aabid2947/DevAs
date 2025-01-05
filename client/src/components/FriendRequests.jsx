import { React, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "react-query";
import { getFriendRequests, acceptFriendRequest } from "../utils/api";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const fetchFriendRequests = async (query) => {
  try {
    const res = await getFriendRequests(query);
    return res;
  } catch (error) {
    throw new Error("Error getting friend ");
  }
};
export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { isFetching, isError, error } = useQuery(
    ["friendRequests", searchQuery],
    () => fetchFriendRequests(searchQuery),
    {
      enabled: triggerSearch && searchQuery.length > 0,
      onSuccess: (data) => {
        setFriendRequests(data.data);
        setTriggerSearch(false);
      },
      onError: (err) => {
        console.error("Query failed:", err.message);
      },
      onSettled: () => {
        console.log("Query settled (success or error)");
      },
    }
  );

  const { mutate: acceptRequest, isLoading: isAccepting } = useMutation(
    acceptFriendRequest,
    {
      onSuccess: () => {
        alert("Friend request accepted!");
        setFriendRequests((prev) => prev.filter((r) => r._id !== requestId));
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
    <div className="w-full max-w-md p-4 rounded-lg">
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
                        <Badge
                          variant="secondary"
                          className="h-4 w-4 bg-blue-500/20 text-blue-400"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">Super Active</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleAcceptRequest(sender._id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 h-8"
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
