
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { register } from "../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaGoogle, FaApple } from "react-icons/fa";
import Leaf from "../assets/leaf.png";
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const interestsOptions = [
  { value: 'coding', label: 'Coding' },
  { value: 'reading', label: 'Reading' },
  { value: 'traveling', label: 'Traveling' },
  { value: 'sports', label: 'Sports' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'music', label: 'Music' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'art', label: 'Art' },
  { value: 'writing', label: 'Writing' },
  { value: 'photography', label: 'Photography' },
];

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(interests)
      const response = await register(username, email, password, interests);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const toggleInterest = (value) => {
    setInterests(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1116] p-4">
      <Card className="w-full max-w-[1200px] overflow-hidden border-zinc-800 bg-[#161920]">
        <div className="flex flex-col lg:flex-row">
          <CardContent className="p-8 lg:w-1/2">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-zinc-100">
                Get Started Now
              </h2>
              {error && <p className="text-red-400 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-[#1c1f2a] border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#1c1f2a] border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#1c1f2a] border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="interests"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Interests
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-[#1c1f2a] border-zinc-700 text-zinc-100 hover:bg-[#252935] hover:text-zinc-100"
                      >
                        {interests.length > 0
                          ? `${interests.length} selected`
                          : "Select interests..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <div className="bg-[#1c1f2a] text-zinc-100 p-2">
                        {interestsOptions.map((interest) => (
                          <button
                            key={interest.value}
                            onClick={() => toggleInterest(interest.value)}
                            className={cn(
                              "flex items-center w-full px-2 py-1 text-left text-sm rounded-md",
                              interests.includes(interest.value)
                                ? "bg-purple-600 text-white"
                                : "hover:bg-[#252935]"
                            )}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                interests.includes(interest.value) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {interest.label}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Sign up
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-zinc-500">or</div>

              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-300 bg-[#1c1f2a] hover:bg-[#252935] transition-colors">
                  <FaGoogle className="h-5 w-5 mr-2" />
                  Sign up with Google
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-300 bg-[#1c1f2a] hover:bg-[#252935] transition-colors">
                  <FaApple className="h-5 w-5 mr-2" />
                  Sign up with Apple
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          </CardContent>
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url(${Leaf})`,
            }}
          />
        </div>
      </Card>
    </div>
  );
}

