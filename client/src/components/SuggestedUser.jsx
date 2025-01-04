import { React, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "react-avatar";
import imageUrl from "../assets/imageURL.jpg";
import { getAlllUsers } from "../utils/api";
import { useQuery, useMutation } from "react-query";
import { searchUsers, sendFriendRequest } from "../utils/api";

export default function SuggestedUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTriggerSearch(true); // Trigger the query
    }
  };

  // Query to fetch friend requests
  const {
    isLoading: isFetching,
    isError,
    error,
  } = useQuery("allUsers", getAlllUsers, {
    onSuccess: (res) => {
      setAllUsers(res.data);
    },
    onError: (err) => {
      console.error("Error fetching friend requests:");
    },
  });

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
    <div className="lg:col-span-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{allUsers.length} Suggested Users</h2>
      
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-gray-500 mb-4">
            TOP USERS BASED ON YOUR CONNECTIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isFetching ? (
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            ) : isError ? (
              <div className="text-center text-red-500">
                Error fetching friend requests.
              </div>
            ) : allUsers.length > 0 ? (
              allUsers.map((user) => (
                <Card key={user._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={imageUrl}
                        size="50" // You can adjust the size as per your needs
                        round={true} // Makes the image circular
                        maxInitials={2} // Limit the initials to 2 characters
                        className="flex-shrink-0" // Ensures the avatar doesn't shrink
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{user.username}</h4>
                        <p className="text-sm text-gray-500 text-wrap break-words">
                          {user.email}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {/* {user.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 bg-gray-100 rounded"
          >
            {skill}
          </span>
        ))} */}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleSendRequest(user._id)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Friend Request
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No Suggested User found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
