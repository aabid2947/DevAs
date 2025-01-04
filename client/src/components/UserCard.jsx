import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, FileText } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "react-avatar"; // Importing the Avatar componen
import imageUrl from "../assets/imageURL.jpg";

export default function UserCard() {
  const { token, user, logout } = useAuth();


  return (
    <div className="lg:col-span-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">Freelance</p>
            </div>
            <Button variant="outline">Connect</Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                RECRUITED BY
              </h3>
              <div className="flex items-center gap-3">
                <Avatar
                  name={user.username}
                  src={imageUrl}
                  size="50" // You can adjust the size as per your needs
                  round={true} // Makes the image circular
                  maxInitials={2} // Limit the initials to 2 characters
                />
                <div>
                  <p className="font-medium">Clara Schneider</p>
                  <p className="text-sm text-gray-500">Freelance</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Contact Details
              </h3>
              <div className="space-y-2">
                <p className="text-sm">Tel: +49 151 234-56789</p>
                <p className="text-sm">E-Mail: {user.email}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm">None</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Documents
              </h3>
              <Card className="bg-red-50">
                <CardContent className="p-3 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">CV Max.pdf</p>
                    <p className="text-xs text-gray-500">251 KB</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
