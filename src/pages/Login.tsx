import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, Shield } from "lucide-react"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Logging in...")
    navigate("/admin/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-600 p-2 text-white shadow-md">
            <Shield size={20} />
          </div>
          <h1 className="mt-5 font-sans text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500">Please sign in to continue</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <div className="group relative">
                <MailIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 rounded-lg border-slate-200 pl-10 focus:border-blue-600 focus:ring-blue-600"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
              </div>
              <div className="group relative">
                <LockIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 rounded-lg border-slate-200 pr-10 pl-10 focus:border-blue-600 focus:ring-blue-600"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-blue-600 font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
