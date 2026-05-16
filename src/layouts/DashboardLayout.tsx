import {
  LayoutDashboard,
  Menu,
  User,
  Users,
  NotebookPen,
  Settings,
  AppWindow,
  DatabaseBackup,
  ShieldCheck,
  ChevronsLeft,
  LogOut,
  MessageCircle,
} from "lucide-react"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"

import { DeleteModal } from "../components/DeleteModal"
import { Button } from "@/components/ui/button"

const routes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
  { name: "Apps", path: "/admin/apps", icon: <AppWindow size={20} /> },
  {
    name: "Message",
    path: "/admin/message",
    icon: <MessageCircle size={20} />,
  },
  {
    name: "Unit History",
    path: "/admin/unit-history",
    icon: <DatabaseBackup size={20} />,
  },
  { name: "Reports", path: "/admin/reports", icon: <NotebookPen size={20} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
]

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)

  // 🔄 CRUD & Auth Process: Logout လုပ်တဲ့အခါ Token ဖျက်ပြီး လမ်းကြောင်းလွှဲမယ်
  const handleLogout = () => {
    localStorage.removeItem("token") // Token ကို ရှင်းထုတ်ခြင်း
    console.log("Logged out and token cleared!")
    navigate("/login") // Login စာမျက်နှာသို့ ပြန်ပို့ခြင်း
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50">
      {/* ----------------- ၁။ SIDEBAR ----------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex transform flex-col border-r border-slate-200 bg-white p-6 transition-all ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full border-none p-0"
        }`}
      >
        {/* Sidebar က ပွင့်နေမှ အထဲက စာသားတွေကို ပြမယ် (UI မရှုပ်အောင်) */}
        {isOpen && (
          <>
            <div className="mb-8 flex items-center justify-between text-xl font-bold text-indigo-600">
              <div className="flex items-center gap-2">
                <ShieldCheck />
                <span>Admin Panel</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="outline-none">
                <ChevronsLeft
                  size={20}
                  className="cursor-pointer text-slate-400 transition-colors hover:text-indigo-600"
                />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-400"
                    }`
                  }
                >
                  {route.icon} {route.name}
                </NavLink>
              ))}
            </nav>

            {/* Logout ခလုတ်နှင့် Modal ချိတ်ဆက်မှု အပိုင်း */}
            <div className="border-t border-slate-100 pt-4">
              <DeleteModal
                title="Are you sure you want to logout?"
                description="You will need to login again to access the admin panel."
                onConfirm={handleLogout} // အပေါ်က handleLogout function ကို လှမ်းခေါ်တယ်
                triggerButton={
                  <Button className="flex w-full justify-start rounded-md bg-red-500 px-4 py-5.5 text-left text-sm text-white shadow-sm transition-all hover:bg-red-600">
                    <LogOut size={20} className="mr-2" />
                    <span>Logout</span>
                  </Button>
                }
              />
            </div>
          </>
        )}
      </aside>

      {/* ----------------- ၂။ RIGHT SIDE CONTENT AREA ----------------- */}
      {/* Sidebar ပွင့်/ပိတ်ပေါ်မူတည်ပြီး ညာဘက်အခြမ်းရဲ့ Margin (ml-64) ကို Dynamic ပြောင်းပေးရပါမယ် */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Top Navbar */}
        <nav className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-full items-center justify-between px-6">
            <div className="flex items-center gap-4">
              {/* Sidebar ပိတ်နေမှ Menu ဟာလေး ပေါ်လာမယ် */}
              {!isOpen && (
                <Menu
                  className="cursor-pointer text-slate-500 transition-colors hover:text-indigo-600"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <div
                onClick={() => navigate("/admin/profile")}
                className="cursor-pointer rounded-full border border-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-100"
              >
                <User size={20} />
              </div>
            </div>
          </div>
        </nav>

        {/* Main View Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
