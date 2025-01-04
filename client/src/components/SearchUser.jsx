import { React, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { searchUsers, sendFriendRequest } from "../utils/api";
import { useQuery, useMutation } from "react-query";
import { FaUserPlus } from "react-icons/fa";
import { Search, User, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const fetchUser = async (query) => {
  try {
    const response = await searchUsers(query);

    return response;
  } catch (error) {
    console.error("Error in fetchUser:", error);
    throw error; // Ensure errors propagate to `useQuery`
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
    enabled: triggerSearch && searchQuery.length > 0, // Trigger query only when conditions are met
    onSuccess: (data) => {
      // // Check if the searched user is already a friend
      const friendIds = user.friendList.map((friend) => friend._id);
      const isFriend = friendIds.includes(data.data._id);
      setIsSearchedUserFriend(isFriend);
      console.log("isFriend:", user.friendList);

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
      setTriggerSearch(true); // Trigger the query
    }
  };

  // Mutation for sending friend requests
  const { mutate: sendRequest, isLoading } = useMutation(sendFriendRequest, {
    onSuccess: () => {
      alert("Friend request sent successfully!"); // Replace with better UI feedback
    },
    onError: (error) => {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request."); // Replace with better UI feedback
    },
  });

  const handleSendRequest = (recipientId) => {
    sendRequest(recipientId); // Call the mutation function
  };
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="w-full max-w-sm  bg-background rounded-lg border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* Cross Icon to clear search query */}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery(""); // Clear search query
                  setSearchedUsers([])
                  
                  
                }}
                className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
              >
                <X />
              </button>
            )}
          </div>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {searchedUsers.length > 0 ? (
              searchedUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="relative flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {true && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full bg-green-500" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user.username}
                      </span>
                      {user.email && (
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>
                  {isSearchedUserFriend ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      className="text-blue-500 hover:text-blue-600"
                      title="Add Friend"
                      disabled={isLoading}
                    >
                      <FaUserPlus size={20} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No users found
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
