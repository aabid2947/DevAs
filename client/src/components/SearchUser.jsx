
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useQuery, useMutation } from "react-query";
import { sendFriendRequest,searchUsers } from "../utils/api";

const fetchUser = async (query) => {
  try {
    const response = await searchUsers(query);
    return response;
  } catch (error) {
    console.error("Error in fetchUser:", error);
    throw error;
  }
};
const SearchUsers = () => {
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
      console.log(90)
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

  const handleClose = () => {
    setSearchQuery("");
    setSearchedUsers([]);
  };

  return (
    <div className="w-full  bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl p-6 relative">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Check What Your Friends Up To!
        </h2>
        <p className="hidden text-purple-200/80 text-sm">
          Conveniently customize proactive web services for leveraged without
          continualliery aggregate frictionele ou wellis richard and very
          customize. continually.
        </p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300" />
        <Input
          placeholder="Search users..."
          className="pl-10 bg-purple-900/50 border-purple-600/30 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchQuery && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300 hover:text-purple-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchedUsers.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl shadow-xl z-50 border border-purple-600/30">
          <ScrollArea className="max-h-[300px] py-2">
            <div className="space-y-2 px-4">
              {searchedUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-purple-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-purple-600/30">
                      <AvatarFallback className="bg-purple-900/50">
                        <User className="h-4 w-4 text-purple-300" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-white">
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
                        <span className="text-xs text-purple-300">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>
                  {!isSearchedUserFriend && (
                    <Button
                      onClick={() => {
                        handleSendRequest(user._id);
                        handleClose();
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-4 h-8 rounded-lg"
                      disabled={isLoading}
                    >
                      Add Friend
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
