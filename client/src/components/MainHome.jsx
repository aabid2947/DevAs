
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import Sidebar from "@/components/Sidebar";
import SearchUser from "@/components/SearchUser";
import SuggestedUser from "@/components/SuggestedUser";
import FriendList from "@/components/FriendList";
import FriendRequests from "../components/FriendRequests";

export default function Home() {
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
    <div className="flex h-screen overflow-hidden bg-[#15161E] text-zinc-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#161920] border-r border-zinc-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <Sidebar
          isMobile={typeof window !== "undefined" && window.innerWidth < 1024}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-4">
              <Button onClick={toggleSidebar} variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </div>

            <div className="space-y-8 ml-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left column (5/8 width on md and above) */}
                <div className="w-full md:w-5/8 space-y-8">
                  <SearchUser />
                  <FriendList />
                </div>

                {/* Right column (3/8 width on md and above) */}
                <div className="w-full md:w-3/8 space-y-8">
                  <SuggestedUser />
                  <FriendRequests />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

