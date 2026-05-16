import { useState, type ChangeEvent } from "react"
import {
  Globe,
  ShieldCheck,
  Bell,
  Sliders,
  Save,
  RefreshCw,
  Server,
  Database,
  Loader2,
  Lock,
  Eye,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type SettingsTab = "general" | "security" | "notifications" | "system"

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general")
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // 🌟 ၁။ General Settings State
  const [siteSettings, setSiteSettings] = useState({
    siteName: "My Admin Portal",
    siteEmail: "support@admin.com",
    maintenanceMode: false,
  })

  // 🌟 ၂။ Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    twoFactorAuth: true,
  })

  // 🌟 ၃။ Notification Settings State
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    slackAlerts: false,
    auditLogs: true,
  })

  // Mock Save Action
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1200) // 1.2s Loading ပြပြီး Save မည်
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <div className="mb-6 border-b border-slate-200 pb-5">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-800">
          System Settings
        </h1>
        <p className="text-sm text-slate-500">
          Configure global dashboard preferences, authentication levels, and
          system parameters.
        </p>
      </div>

      {/* Grid Layout: Sidebar + Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* ----------------- ဘယ်ဘက်ခြမ်း: Settings Navigation Sidebar ----------------- */}
        <div className="flex flex-col space-y-1">
          {[
            {
              id: "general",
              label: "General Config",
              icon: <Globe size={16} />,
            },
            {
              id: "security",
              label: "Security & Auth",
              icon: <ShieldCheck size={16} />,
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell size={16} />,
            },
            {
              id: "system",
              label: "System Status",
              icon: <Server size={16} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ----------------- ညာဘက်ခြမ်း: Main Dynamic Content Area ----------------- */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs md:col-span-3">
          {/* TAB ၁။ GENERAL CONFIGURATION */}
          {activeTab === "general" && (
            <div className="animate-in space-y-5 duration-200 fade-in">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <Sliders size={18} className="text-indigo-500" /> General Site
                Preferences
              </h3>
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        siteName: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                    System Support Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.siteEmail}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        siteEmail: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Maintenance Mode
                    </h4>
                    <p className="text-xs text-slate-400">
                      Offline the website front-end for public users during
                      updates.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={siteSettings.maintenanceMode}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB ၂။ SECURITY & AUTHENTICATION */}
          {activeTab === "security" && (
            <div className="animate-in space-y-5 duration-200 fade-in">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <Lock size={18} className="text-indigo-500" /> Security
                Credentials
              </h3>
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={securitySettings.currentPassword}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-400 uppercase">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={securitySettings.newPassword}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Two-Factor Authentication (2FA)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Enforce OTP security token validation upon administrator
                      sign-in.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                    className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB ၃။ NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="animate-in space-y-5 duration-200 fade-in">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <Bell size={18} className="text-indigo-500" /> System Dispatch
                Triggers
              </h3>
              <div className="space-y-3 border-t border-slate-100 pt-4">
                {[
                  {
                    title: "Critical Email Alerts",
                    desc: "Send immediate emails for server failures and brute-force events.",
                    key: "emailAlerts",
                    val: notifSettings.emailAlerts,
                  },
                  {
                    title: "Slack Webhook Notifications",
                    desc: "Push audit log logs channel updates straight into Slack workspace.",
                    key: "slackAlerts",
                    val: notifSettings.slackAlerts,
                  },
                  {
                    title: "Store Admin Audit Logs",
                    desc: "Permanently capture active administrator movements inside local database.",
                    key: "auditLogs",
                    val: notifSettings.auditLogs,
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50/50"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h4>
                      <p className="max-w-md text-xs text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={item.val}
                      onChange={(e) =>
                        setNotifSettings({
                          ...notifSettings,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB ၄။ SYSTEM STATUS (READ-ONLY METRICS) */}
          {activeTab === "system" && (
            <div className="animate-in space-y-5 duration-200 fade-in">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <Server size={18} className="text-indigo-500" /> Server Node
                Matrix
              </h3>
              <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <Database size={12} /> Database Connection
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />{" "}
                    Operational (Ping: 14ms)
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    <RefreshCw size={12} /> App Environment
                  </div>
                  <div className="text-sm font-semibold text-slate-700">
                    Production v2.4.1-stable
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Common Action Buttons */}
          {activeTab !== "system" && (
            <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
              <Button
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="gap-1.5 rounded-md bg-indigo-600 py-5 text-white shadow-sm hover:bg-indigo-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Saving
                    Configuration...
                  </>
                ) : (
                  <>
                    <Save size={15} /> Save Settings
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
