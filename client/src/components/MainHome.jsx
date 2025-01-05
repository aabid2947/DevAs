
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchUser from "./SearchUser"
import FriendRequests from "../components/FriendRequests"
import UserCard from "./UserCard"
import SuggestedUser from "./SuggestedUser"
import Sidebar from "./Sidebar"

export default function MainHome() {
  const [activeTab, setActiveTab] = useState("friendRequest")

  return (
    <div className="min-h-screen bg-[#0f1116] text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-8">
            <Card className="bg-[#161920] border-zinc-800">
              <CardContent className="p-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
                    <TabsTrigger value="searchUser" className="data-[state=active]:bg-zinc-700">
                      Search User
                    </TabsTrigger>
                    <TabsTrigger value="friendRequest" className="data-[state=active]:bg-zinc-700">
                      Friend Requests
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="searchUser" className="mt-4">
                    <SearchUser />
                  </TabsContent>
                  <TabsContent value="friendRequest" className="mt-4">
                    <FriendRequests />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <SuggestedUser />
          </div>

          {/* Right Sidebar - User Details */}
          {/* <div className="lg:col-span-3">
            <UserCard />
          </div> */}
        </div>
      </div>
    </div>
  )
}

