"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-60 justify-start rounded-md border border-gray-300 bg-gray-50 text-left font-normal transition-all hover:bg-gray-50"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-xl border-blue-100 p-0 shadow-xl"
        align="end"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl"
        />
      </PopoverContent>
    </Popover>
  )
}
