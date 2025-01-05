import { React, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { searchUsers, sendFriendRequest } from "../utils/api";
import { useQuery, useMutation } from "react-query";
import { Search, User, X, MoreVertical } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const fetchUser = async (query) => {
  try {
    const response = await searchUsers(query);
    return response;
  } catch (error) {
    console.error("Error in fetchUser:", error);
    throw error;
  }
};

export default function SearchUser() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isSearchedUserFriend, setIsSearchedUserFriend] = useState(false);

  const {
    data: users,
    isLoadinguser,
    isError,
    error,
  } = useQuery(["searchedUsers", searchQuery], () => fetchUser(searchQuery), {
    enabled: triggerSearch && searchQuery.length > 0,
    onSuccess: (data) => {
      const friendIds = user.friendList.map((friend) => friend._id);
      const isFriend = friendIds.includes(data.data._id);
      setIsSearchedUserFriend(isFriend);
      setSearchedUsers(data.data);
      setTriggerSearch(false);
    },
    onError: (err) => {
      console.error("Query failed:", err.message);
    },
    onSettled: () => {
      console.log("Query settled (success or error)");
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTriggerSearch(true);
    }
  };

  const { mutate: sendRequest, isLoading } = useMutation(sendFriendRequest, {
    onSuccess: () => {
      alert("Friend request sent successfully!");
    },
    onError: (error) => {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request.");
    },
  });

  const handleSendRequest = (recipientId) => {
    sendRequest(recipientId);
  };

  return (
    <div className="w-full max-w-md bg-[#1F2128] rounded-lg">
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search users..."
            className="pl-10 bg-[#1c1f2a] border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchedUsers([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[400px] px-4 pb-4">
        {searchedUsers.length > 0 ? (
          <div className="space-y-2">
            {searchedUsers.map((user) => (
              <div
                key={user._id}
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
                        {user.username}
                      </span>
                      {user.verified && (
                        <Badge
                          variant="secondary"
                          className="h-4 w-4 bg-blue-500/20 text-blue-400"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    {user.email && (
                      <span className="text-xs text-zinc-500">
                        {user.email}
                      </span>
                    )}
                  </div>
                </div>
                {!isSearchedUserFriend && (
                  <Button
                    onClick={() => {
                      handleSendRequest(user._id);
                      setSearchQuery("");

                      setSearchedUsers([]);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 h-8"
                    disabled={isLoading}
                  >
                    Add Friend
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </ScrollArea>
    </div>
  );
}
