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
} from "lucide-react"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { ConfirmModal } from "@/components/ConfirmModal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const routes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
  { name: "Apps", path: "/admin/apps", icon: <AppWindow size={20} /> },
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
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - fixed and full height */}
      {isOpen && (
        <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-6">
          <div className="mb-8 flex items-center justify-between text-xl font-bold text-blue-600">
            <div className="flex items-center gap-2">
              <ShieldCheck />
              Admin Panel
            </div>
            <div onClick={() => setIsOpen(false)}>
              <ChevronsLeft
                size={20}
                className="cursor-pointer hover:text-blue-800"
              />
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {route.icon} {route.name}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-slate-100 pt-4">
            <ConfirmModal
              title="Are you sure you want to log out?"
              description="This action cannot be undone."
              onConfirm={handleLogout}
            >
              <Button
                variant="destructive"
                className="w-full justify-start gap-2 py-5"
              >
                <LogOut size={20} />
                Logout
              </Button>
            </ConfirmModal>
          </div>
        </aside>
      )}

      {/* Right Side Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar - adjust with ml-64 to start after sidebar */}
        <nav className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-full items-center justify-between px-6">
            <Menu
              className="cursor-pointer text-slate-500"
              onClick={() => setIsOpen(true)}
            />
            <div className="flex items-center gap-4">
              <div className="cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <User size={20} />
              </div>
            </div>
          </div>
        </nav>

        {/* Main View Area */}
        <main className={isOpen ? "ml-64" : "px-6"}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
