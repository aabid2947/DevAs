import { React, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "react-avatar";
import imageUrl from "../assets/imageURL.jpg";
import { useQuery, useMutation } from "react-query";
import { sendFriendRequest } from "../utils/api";
import { getFriendRecommendations } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function SuggestedUser() {
  const [friendRecommendations, setFriendRecommendations] = useState([]);
  const { user } = useAuth();

  // Query to fetch friend recommendations
  const {
    isLoading: isFetching,
    isError,
    error,
  } = useQuery("friendRecommendations", getFriendRecommendations, {
    onSuccess: (res) => {
      const recommendations = res.data || [];

      // Filter recommendations to exclude current user and existing friends
      const filteredRecommendations = recommendations.filter(
        (recommendation) => {
          const isSelf = recommendation.username === user.username;
          const isFriend = user.friendList.some(
            (friend) => friend._id === recommendation._id
          );
          return !isSelf && !isFriend;
        }
      );

      setFriendRecommendations(filteredRecommendations);
    },
    onError: (err) => {
      console.error("Error fetching friend recommendations:", err);
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
    <Card className="bg-[#1F2128] border-zinc-800 border rounded-[20px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-zinc-100">
            SUGGESTED FOR YOU
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-100 hover:text-zinc-100"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {isFetching ? (
            <div className="text-center text-zinc-500">Loading...</div>
          ) : isError ? (
            <div className="text-center text-red-500">
              Error fetching suggestions.
            </div>
          ) : friendRecommendations.length > 0 ? (
            friendRecommendations.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={imageUrl}
                    size="40"
                    round={true}
                    maxInitials={2}
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-zinc-100">
                      {user.username}
                    </h4>
                    <p className="text-xs text-zinc-500">Super Active</p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleSendRequest(user._id);
                    window.location.reload();
                  }}
                  className="h-8 bg-purple-600 hover:bg-purple-700 text-xs font-medium"
                >
                  Add Friend
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500">
              No suggestions available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
