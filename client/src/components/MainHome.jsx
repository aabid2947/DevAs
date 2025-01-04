import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import SearchUser from "./SearchUser";
import FriendRequests from "../components/FriendRequests";
import UserCard from "./UserCard";
import SuggestedUser from "./SuggestedUser";



export default function MainHome() {
  const [friendList, setFriendList] = useState([]);
  const [activeTab, setActiveTab] = useState("friendRequest"); // Added state to handle tab switching

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-col-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            {/* Tab buttons to toggle between views */}
            <div className="flex justify-start gap-6 mb-4">
              <button
                onClick={() => setActiveTab("searchUser")}
                className={`px-4 py-2 rounded-lg ${activeTab === "searchUser" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                Search User
              </button>
              <button
                onClick={() => setActiveTab("friendRequest")}
                className={`px-4 py-2 rounded-lg ${activeTab === "friendRequest" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                Friend Requests
              </button>
            </div>

            {/* Conditional rendering based on active tab */}
            <div className="bg-background p-4 rounded-lg border">
              {activeTab === "searchUser" ? <SearchUser /> : <FriendRequests />}
            </div>
          </div>

          {/* Main Content */}
          <SuggestedUser />

          {/* Right Sidebar - Details */}
          <UserCard />
        </div>
      </div>
    </div>
  );
}
