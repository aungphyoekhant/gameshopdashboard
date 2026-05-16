import { create } from "zustand"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { LockKeyhole, LockKeyholeOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertStore {
  isOpen: boolean
  message: string
  type: "success" | "error"
  show: (msg: string, type: "success" | "error") => void
  hide: () => void
}

const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: "",
  type: "success",
  show: (msg, type) => set({ isOpen: true, message: msg, type }),
  hide: () => set({ isOpen: false }),
}))

// 🔥 အပြင်ကနေ လှမ်းခေါ်မယ့် Callbacks
export const showSuccess = (message: string) =>
  useAlertStore.getState().show(message, "success")
export const showError = (message: string) =>
  useAlertStore.getState().show(message, "error")

export function GlobalAlert() {
  const { isOpen, message, type, hide } = useAlertStore()

  const isSuccess = type === "success"

  return (
    <AlertDialog open={isOpen} onOpenChange={hide}>
      <AlertDialogContent className="max-w-87 animate-in rounded-2xl border-none shadow-2xl duration-200 fade-in zoom-in">
        <AlertDialogHeader>
          {/* Dynamic Icon based on type */}
          <div
            className={cn(
              "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full shadow-inner",
              isSuccess
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            )}
          >
            {isSuccess ? (
              <LockKeyholeOpen size={20} />
            ) : (
              <LockKeyhole size={20} />
            )}
          </div>

          <AlertDialogTitle className="mx-auto text-center text-xl font-bold text-slate-800">
            {isSuccess ? "Success!" : "Failed!"}
          </AlertDialogTitle>

          <AlertDialogDescription className="mx-auto pt-1 text-center font-medium text-slate-500">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 sm:justify-center">
          <AlertDialogAction
            onClick={hide}
            className={cn(
              "rounded-lg px-8 py-5 font-bold text-white shadow-lg transition-all active:scale-95",
              isSuccess
                ? "bg-green-600! shadow-green-200! hover:bg-green-700!"
                : "bg-red-600 shadow-red-200 hover:bg-red-700"
            )}
          >
            {isSuccess ? "Done" : "Try Again"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
