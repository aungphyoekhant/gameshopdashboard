"use client"

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteModalProps {
  title?: string
  description?: string
  onConfirm: () => void
  triggerButton?: React.ReactNode // အပြင်ကနေ button ပုံစံမျိုးစုံ ထည့်လို့ရအောင်
}

export function DeleteModal({
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the data.",
  onConfirm,
  triggerButton,
}: DeleteModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerButton || <Button variant="destructive">Delete</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-lg border-none shadow-lg">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2Icon size={20} />
          </div>
          <AlertDialogTitle className="text-md mx-auto text-center font-bold text-slate-800">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto text-center text-sm text-slate-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3 sm:justify-center">
          <AlertDialogCancel className="rounded-md border-slate-200 px-6 py-5 hover:bg-slate-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-6 py-5 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
