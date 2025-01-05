import { React, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {  MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "react-avatar";
import imageUrl from "../assets/imageURL.jpg";
import { useAuth } from "../contexts/AuthContext";

export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    try {
      console.log(user.friendList)
      setFriendList(user.friendList);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card className="bg-[#1F2128] border-zinc-800 border rounded-[20px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-zinc-100">
           Your Friends
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
          {friendList.length > 0 ? (
            friendList.map((user) => (
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
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>
                
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500">
              No Friends available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
