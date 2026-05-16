import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { useLoginMutation } from "@/services/authServices"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data: any) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-8 rounded-2xl border bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-indigo-600 p-2 text-white shadow-lg">
            <Shield size={22} />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Email Address</Label>
              <div className="relative">
                <MailIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                <Input
                  {...register("email", { required: "Email Required" })}
                  type="email"
                  placeholder="name@company.com"
                  className={`py-5 pl-10 transition-all focus:ring-2 focus:ring-blue-100 ${errors.email ? "border-red-500 shadow-sm shadow-red-50" : "border-slate-200"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">Password</Label>
              <div className="group relative">
                <LockIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                <Input
                  {...register("password", {
                    required: "Password Required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`py-5 pr-10 pl-10 transition-all focus:ring-2 focus:ring-blue-100 ${errors.password ? "border-red-500 shadow-sm shadow-red-50" : "border-slate-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-slate-400 transition-colors hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 py-6 text-sm font-bold shadow-lg shadow-blue-100 transition-all hover:bg-indigo-700 active:scale-[0.98]"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
