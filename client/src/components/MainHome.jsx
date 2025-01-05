import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import SearchUser from "./SearchUser";
import FriendRequests from "../components/FriendRequests";
import UserCard from "./UserCard";
import SuggestedUser from "./SuggestedUser";
import Sidebar from "./Sidebar";

export default function MainHome() {
  const [activeTab, setActiveTab] = useState("friendRequest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen text-zinc-100 bg-[#15161E]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden col-span-full mb-4">
            <Button onClick={toggleSidebar} variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`
              fixed top-0 left-0 h-full w-64 bg-[#161920] border-r border-zinc-800 z-50
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:relative lg:col-span-3 lg:block lg:translate-x-0
            `}
          >
            <Sidebar />
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar when overlay is clicked
            />
          )}

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Search and Friend Requests */}
              <Card className="bg-[#1F2128] border-zinc-800 border rounded-[20px]">
                <CardContent className="p-6">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-600/50">
                      <TabsTrigger
                        value="searchUser"
                        className="data-[state=active]:bg-zinc-100"
                      >
                        Search User
                      </TabsTrigger>
                      <TabsTrigger
                        value="friendRequest"
                        className="data-[state=active]:bg-zinc-100"
                      >
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
              

              {/* Suggested Users */}
              <SuggestedUser />
            </div>

            {/* User Details */}
            <Card className="bg-[#161920] border-zinc-800">
              <CardContent className="p-6">
                <UserCard />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
