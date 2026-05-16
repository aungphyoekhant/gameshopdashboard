import { useState } from "react"
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom"
import { DeleteModal } from "../components/DeleteModal"
import { Button } from "@/components/ui/button"
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
  ChevronDown,
} from "lucide-react"

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
  {
    name: "Settings",
    icon: <Settings size={20} />,
    isDropdown: true,
    subRoutes: [
      { name: "General", path: "/admin/settings?tab=general" },
      { name: "Privacy", path: "/admin/settings?tab=privacy" },
      { name: "Account", path: "/admin/settings?tab=account" },
      { name: "Notification", path: "/admin/settings?tab=notification" },
    ],
  },
]

const DashboardLayout = () => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const currentPath = `${pathname}${search}` // 🌟 Path ကော ?tab=... ကော တွဲစစ်ရန်

  const [isOpen, setIsOpen] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Settings အောက်က တစ်ခုခု ရောက်နေသလား စစ်ဆေးခြင်း
  const isSubSettingActive = pathname.startsWith("/admin/settings")

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50 font-sans">
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ----------------- ၁။ SIDEBAR ----------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white p-6 transition-all duration-300 ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full overflow-hidden border-none p-0"}`}
      >
        <div className="flex h-full min-w-52 flex-col">
          <div className="mb-8 flex items-center justify-between text-xl font-bold text-indigo-600">
            <div className="flex items-center gap-2">
              <ShieldCheck />
              <span>Admin Panel</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="outline-none">
              <ChevronsLeft
                size={20}
                className="text-slate-400 hover:text-indigo-600"
              />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {routes.map((route) => {
              if (route.isDropdown) {
                return (
                  <div key={route.name}>
                    <button
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all outline-none ${isSubSettingActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-indigo-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        {route.icon}
                        <span>{route.name}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ${isSettingsOpen ? "rotate-180 text-indigo-600" : ""}`}
                      />
                    </button>

                    {/* Dropdown ရိုးရိုး လင့်ခ်များအဖြစ် map ပတ်ခြင်း */}
                    <div
                      className={`mt-1 mb-10 space-y-1 overflow-hidden pl-9 transition-all duration-300 ${isSettingsOpen ? "max-h-48 opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
                    >
                      {route.subRoutes?.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={
                            currentPath === sub.path
                              ? "block rounded-md bg-slate-50 px-3 py-2 text-sm font-bold text-indigo-600"
                              : "block rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:text-indigo-500"
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <NavLink
                  key={route.path}
                  to={route.path!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${isActive ? "bg-indigo-50 text-indigo-600 shadow-xs" : "text-slate-600 hover:bg-indigo-50"}`
                  }
                >
                  {route.icon} {route.name}
                </NavLink>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-slate-100 pt-4">
            <DeleteModal
              title="Are you sure you want to logout?"
              description="You will need to login again."
              onConfirm={() => {
                localStorage.removeItem("token")
                navigate("/login")
              }}
              triggerButton={
                <Button className="flex w-full justify-start rounded-md bg-red-500 px-4 py-5.5 text-sm text-white hover:bg-red-600">
                  <LogOut size={20} className="mr-2" />
                  <span>Logout</span>
                </Button>
              }
            />
          </div>
        </div>
      </aside>

      {/* ----------------- ၂။ RIGHT SIDE CONTENT AREA ----------------- */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${isOpen ? "md:ml-64" : "ml-0"}`}
      >
        <nav className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-full items-center justify-between px-6">
            <div>
              {!isOpen && (
                <Menu
                  className="cursor-pointer text-slate-500 hover:text-indigo-600"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
            <div
              onClick={() => navigate("/admin/profile")}
              className="cursor-pointer rounded-full border border-slate-100 p-2 text-slate-500 hover:bg-slate-100"
            >
              <User size={20} />
            </div>
          </div>
        </nav>
        <main className="mx-auto w-full max-w-7xl flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
