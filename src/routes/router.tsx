import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../App"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import DashboardLayout from "../layouts/DashboardLayout"
import Reports from "@/pages/Reports"
import Apps from "@/pages/Apps"
import UnitHistory from "@/pages/UnitHistory"
import Settings from "@/pages/Settings"
import Profile from "@/pages/Profile"
import Message from "@/pages/Message"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />, // Root ကိုလာရင် Login ဆီ ပို့ပေးမယ်
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "apps",
            element: <Apps />,
          },
          {
            path: "unit-history",
            element: <UnitHistory />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "message",
            element: <Message />,
          },
        ],
      },
    ],
  },
])

export default router
