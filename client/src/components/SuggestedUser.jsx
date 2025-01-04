import {React,useState} from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const talents = [
    {
      id: 1,
      name: "Max Mustermann",
      status: "Freelance",
      skills: ["Design", "Illustration", "Work"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Sandro Tavares",
      status: "Freelance",
      skills: ["Design", "Illustration"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Luca Kahabade",
      status: "Freelance",
      skills: ["Illustration"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Heracles Gabodos",
      status: "Freelance",
      skills: ["Design", "Work"],
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

export default function SuggestedUser() {
    const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="lg:col-span-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">6 Talents</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search talents..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-6">
      <div>
        <h3 className="text-sm text-gray-500 mb-4">
          TOP PICKS BASED ON YOUR JOB LISTINGS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {talents.slice(0, 2).map((talent) => (
            <Card key={talent.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{talent.name}</h4>
                    <p className="text-sm text-gray-500">{talent.status}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {talent.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-gray-100 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm text-gray-500 mb-4">TOP CONNECTED</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {talents.slice(2).map((talent) => (
            <Card key={talent.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{talent.name}</h4>
                    <p className="text-sm text-gray-500">{talent.status}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {talent.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-gray-100 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
