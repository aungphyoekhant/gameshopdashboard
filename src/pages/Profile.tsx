import { useState, useRef, type ChangeEvent } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Camera,
  Trash2,
  Save,
  X,
  Key,
  Lock,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🌟 ၁။ ယူဆာ အချက်အလက်ပြသရန် ကနဦး State
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "+959 1234 5678",
    location: "Yangon, Myanmar",
    image:
      "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
    role: "Super Admin",
    status: "Active",
  })

  // 🌟 ၂။ Input Column များအတွက် ယာယီ State
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Input စာသားပြောင်းလဲမှုကို ဖမ်းယူခြင်း
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ဒေတာ ပြင်ဆင်မှု ရှိ/မရှိ စစ်ဆေးခြင်း
  const isFormChanged =
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.phone !== user.phone ||
    formData.location !== user.location

  // 🔄 Save Changes Action (မင်းရဲ့ API လာချိတ်ရမယ့်နေရာ)
  const handleSaveChanges = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setUser((prev) => ({ ...prev, ...formData }))
      setIsSubmitting(false)
    }, 1000)
  }

  // 🧹 Cancel Action
  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    })
  }

  // 📷 ပုံရွေးချယ်မှုကို ဖမ်းယူခြင်း
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const previewUrl = URL.createObjectURL(e.target.files[0])
      setUser((prev) => ({ ...prev, image: previewUrl }))
    }
  }

  // 🗑️ ပုံဖျက်ခြင်း
  const handleDeleteAvatar = () => {
    setUser((prev) => ({ ...prev, image: "" }))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-1 border-b border-slate-200 pb-5">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-800">
          Admin Profile
        </h1>
        <p className="text-sm text-slate-500">
          Manage your account settings, personal details, and monitor recent
          activities.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ----------------- Left Section: Admin Card ----------------- */}
        <div className="flex w-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
          {/* Image Wrapper */}
          <div className="relative my-3 h-24 w-24 overflow-hidden rounded-full border-2 border-indigo-100 shadow-inner">
            {user.image ? (
              <img
                src={user.image}
                alt="Admin"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400">
                No Image
              </div>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold text-slate-800">{user.name}</h2>

          {/* Badge */}
          <div className="mt-1.5 flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-600/10">
            <Shield size={12} />
            {user.role}
          </div>

          {/* Quick Info Box */}
          <div className="my-5 w-full space-y-3 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-600">
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-slate-400" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-slate-400" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="text-slate-400" />
              <span>{user.location}</span>
            </div>
          </div>

          <hr className="w-full border-slate-100" />

          {/* Image Controls */}
          <div className="mt-4 flex w-full gap-2">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 gap-1.5 rounded-md border border-indigo-600 bg-white py-5 text-indigo-600 shadow-xs hover:bg-indigo-600 hover:text-white"
            >
              <Camera size={15} /> Upload
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!user.image}
              onClick={handleDeleteAvatar}
              className="flex-1 gap-1.5 rounded-md border-slate-200 py-5 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={15} /> Delete
            </Button>
          </div>
        </div>

        {/* ----------------- Right Section: Account Settings & Logs ----------------- */}
        <div className="space-y-6 lg:col-span-2">
          {/* Form Settings Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="mb-5 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              Account Settings
            </h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <User size={13} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <Mail size={13} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="name" /* API အတွက် 'email' သို့ ပြောင်းလဲနိုင်သည် */
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <Phone size={13} /> Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <MapPin size={13} /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={!isFormChanged || isSubmitting}
                  onClick={handleCancel}
                  className="gap-1.5 rounded-md border-slate-200 py-5 text-slate-600"
                >
                  <X size={15} /> Cancel
                </Button>
                <Button
                  type="button"
                  disabled={!isFormChanged || isSubmitting}
                  onClick={handleSaveChanges}
                  className="gap-1.5 rounded-md bg-indigo-600 py-5 text-white shadow-xs hover:bg-indigo-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Activity Logs Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
              <Clock size={17} className="text-slate-400" /> Recent Security
              Logs
            </h3>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  action: "Admin profile metadata modified",
                  time: "Just now",
                  icon: <User size={13} className="text-blue-600" />,
                  color: "bg-blue-50",
                },
                {
                  id: 2,
                  idc: "Success",
                  action: "Sign-in verified via 2FA token",
                  time: "3 hours ago",
                  icon: <CheckCircle size={13} className="text-emerald-600" />,
                  color: "bg-emerald-50",
                },
                {
                  id: 3,
                  action: "Account root password reset request",
                  time: "2 days ago",
                  icon: <Key size={13} className="text-amber-600" />,
                  color: "bg-amber-50",
                },
              ].map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between rounded-xl bg-slate-50/70 p-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${log.color}`}
                    >
                      {log.icon}
                    </div>
                    <span className="font-medium text-slate-700">
                      {log.action}
                    </span>
                  </div>
                  <span className="pt-0.5 text-xs text-slate-400">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
