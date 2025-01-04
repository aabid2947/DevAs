'use client'

import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { login } from "../utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Leaf from "../assets/leaf.png"
import { Card, CardContent } from "@/components/ui/card"
import { FaGoogle, FaApple } from "react-icons/fa"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { login: authLogin } = useAuth()


  useEffect(() => {
    // Check if user data is in localStorage on page load
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      // If user is already logged in, redirect to the home page
      navigate("/")
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(email, password)

      
      // Store the user and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", response.data.token)
      
      authLogin(response.data.user, response.data.token)
      console.log(response.data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[1200px] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <CardContent className="p-8 lg:w-1/2">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your credentials to access your account
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm text-green-800 hover:text-green-900"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-900 text-white"
                >
                  Sign in
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">or</div>

              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FaGoogle className="h-5 w-5 mr-2" />
                  Sign in with Google
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FaApple className="h-5 w-5 mr-2" />
                  Sign in with Apple
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-green-800 hover:text-green-900 font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: `url(${Leaf})`,
            }}
          />
        </div>
      </Card>
    </div>
  )
}

