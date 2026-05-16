import { useState, useRef, type FormEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { ConfirmModal } from "@/components/ConfirmModal"
import { Button } from "@/components/ui/button"
// 🚀 Shadcn UI Select Components ကို Import လုပ်ပါတယ်
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Lock,
  Globe,
  Bell,
  UserCog,
  KeyRound,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react"

export default function Settings() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "general"

  const passwordFormRef = useRef<HTMLFormElement>(null)

  // --- State Configurations ---
  const [siteName, setSiteName] = useState("Harlan Restaurant")
  const [siteEmail, setSiteEmail] = useState("admin@harlan.com")

  // 🌟 Language State (Shadcn UI Select နဲ့ ချိတ်ဆက်ထားပါတယ်)
  const [language, setLanguage] = useState("en")

  const [emailNotify, setEmailNotify] = useState(true)
  const [orderNotify, setOrderNotify] = useState(true)
  const [showCurrentPwd, setShowCurrentPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!passwordFormRef.current) return
    const formData = new FormData(passwordFormRef.current)
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("ကျေးဇူးပြု၍ စကားဝှက် ကွက်လပ်အားလုံးကို ဖြည့်စွက်ပေးပါ။")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("စကားဝှက်အသစ်နှင့် အတည်ပြုစကားဝှက် ကိုက်ညီမှု မရှိပါ။")
      return
    }
    alert("Password updated successfully!")
    passwordFormRef.current.reset()
  }

  const handleGeneralSave = (e: FormEvent) => {
    e.preventDefault()
    console.log("Saving Settings:", {
      siteName,
      siteEmail,
      language,
      emailNotify,
      orderNotify,
    })
    alert("Settings updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your system configuration, notifications, and security here.
        </p>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
        {/* --- ၁။ GENERAL VIEW (Shadcn UI Select သုံးထားသော ဗားရှင်း) --- */}
        {activeTab === "general" && (
          <form
            onSubmit={handleGeneralSave}
            className="animate-in space-y-6 duration-200 fade-in"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              <Globe className="text-indigo-600" size={20} />{" "}
              <span>General Settings</span>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-5">
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Application Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter system name"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  System Support Email
                </label>
                <input
                  type="email"
                  value={siteEmail}
                  onChange={(e) => setSiteEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter contact email"
                />
              </div>

              {/* 🚀 SHADCN UI SELECT COMPONENT FOR LANGUAGE */}
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Default Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md border border-slate-200 bg-white shadow-md">
                    <SelectItem
                      value="en"
                      className="cursor-pointer p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      English (US)
                    </SelectItem>
                    <SelectItem
                      value="mm"
                      className="cursor-pointer p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Myanmar (မြန်မာ)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-indigo-600 px-5 py-5 text-white hover:bg-indigo-700"
              >
                <Save size={16} /> Save Configurations
              </Button>
            </div>
          </form>
        )}

        {/* --- ၂။ PRIVACY & SECURITY --- */}
        {activeTab === "privacy" && (
          <div className="max-w-xl animate-in space-y-6 duration-200 fade-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              <Lock className="text-indigo-600" size={20} />{" "}
              <span>Privacy & Security</span>
            </div>

            <form
              ref={passwordFormRef}
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
            >
              <div className="text-md mb-2 flex items-center gap-2 font-bold text-slate-700">
                <KeyRound size={18} className="text-indigo-500" />
                <span>Update Admin Password</span>
              </div>

              <div className="relative">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Current Password
                </label>
                <input
                  type={showCurrentPwd ? "text" : "password"}
                  name="currentPassword"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-200 p-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                  className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  New Password
                </label>
                <input
                  type={showNewPwd ? "text" : "password"}
                  name="newPassword"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-200 p-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPwd(!showNewPwd)}
                  className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600"
                >
                  {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-200 p-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="pt-2">
                <ConfirmModal
                  title="Are you sure you want to change password?"
                  description="This will instantly change your security credentials."
                  onConfirm={() => passwordFormRef.current?.requestSubmit()}
                >
                  <Button
                    type="button"
                    className="w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
                  >
                    Save New Password
                  </Button>
                </ConfirmModal>
              </div>
            </form>
          </div>
        )}

        {/* --- ၃။ NOTIFICATION VIEW --- */}
        {activeTab === "notification" && (
          <div className="max-w-xl animate-in space-y-6 duration-200 fade-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              <Bell className="text-indigo-600" size={20} />{" "}
              <span>Notifications</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-700">
                    Email Notifications
                  </div>
                  <div className="text-xs text-slate-400">
                    Receive reports and user alerts via email.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-700">
                    System Activity Alerts
                  </div>
                  <div className="text-xs text-slate-400">
                    Get notified about critical database logs or system backups.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={orderNotify}
                  onChange={(e) => setOrderNotify(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
            <Button
              onClick={handleGeneralSave}
              className="bg-indigo-600 px-5 py-5 text-white hover:bg-indigo-700"
            >
              Save Preference
            </Button>
          </div>
        )}

        {/* --- ၄။ ACCOUNT VIEW --- */}
        {activeTab === "account" && (
          <div className="max-w-xl animate-in space-y-6 duration-200 fade-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              <UserCog className="text-indigo-600" size={20} />{" "}
              <span>Account Settings</span>
            </div>
            <div className="flex items-start gap-4 rounded-md border border-indigo-100 bg-indigo-50/50 p-5">
              <ShieldCheck
                className="mt-0.5 flex-shrink-0 text-indigo-600"
                size={24}
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Super Administrator Role
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Your account currently has total access rights over all
                  application modules.
                </p>
                <div className="mt-3 flex gap-4 text-xs font-medium text-slate-400">
                  <div>
                    Status:{" "}
                    <span className="font-bold text-green-600">Active</span>
                  </div>
                  <div>•</div>
                  <div>
                    Tier:{" "}
                    <span className="font-bold text-indigo-600">
                      Level 1 Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
