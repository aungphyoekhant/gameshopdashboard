import { DatePickerDemo } from "@/components/DatePickerDemo"
import {
  TrendingUp,
  NotebookPen,
  Shield,
  ShieldBan,
  ShieldCheck,
  TvMinimal,
  UserCog,
  Users,
  Video,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Chart Data
const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Dashboard() {
  // Number Formatting function
  const formatNumber = (num: number) => {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num)
  }

  const totalUser = [
    {
      name: "Total Apps",
      value: 56,
      icon: TvMinimal,
      color: "bg-blue-500",
      text: "text-blue-600",
    },
    {
      name: "Total Users",
      value: 20000000,
      icon: Users,
      color: "bg-emerald-500",
      text: "text-emerald-600",
    },
    {
      name: "Total Reports",
      value: 1200,
      icon: NotebookPen,
      color: "bg-rose-500",
      text: "text-rose-600",
    },
    {
      name: "Total Staffs",
      value: 450,
      icon: Shield,
      color: "bg-amber-500",
      text: "text-amber-600",
    },
    {
      name: "Total Admins",
      value: 12,
      icon: ShieldCheck,
      color: "bg-purple-500",
      text: "text-purple-600",
    },
    {
      name: "Total Streamers",
      value: 890,
      icon: Video,
      color: "bg-pink-500",
      text: "text-pink-600",
    },
    {
      name: "Total Supervisors",
      value: 45,
      icon: ShieldBan,
      color: "bg-slate-500",
      text: "text-slate-600",
    },
    {
      name: "Total Superadmins",
      value: 5,
      icon: UserCog,
      color: "bg-indigo-500",
      text: "text-indigo-600",
    },
  ]

  return (
    <div className="mx-auto flex flex-col gap-6 overflow-hidden p-3">
      {/* Header Section */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-600">
          Welcome back! Here is what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid - Fixed for Mobile Scroll */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {totalUser.map((item) => (
          <Card
            className={`${item.color} border-none shadow-md transition-all active:scale-[0.98] sm:hover:scale-[1.02]`}
            key={item.name}
          >
            <CardHeader className="p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* White Icon Box */}
                <div className="shrink-0 rounded-xl bg-white/95 p-2.5 shadow-sm sm:p-3">
                  <item.icon
                    size={20}
                    className={`${item.text} sm:h-6 sm:w-6`}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold tracking-wider text-white/80 uppercase sm:text-xs">
                    {item.name}
                  </p>
                  <p
                    className="truncate font-sans text-xl font-black text-white sm:text-2xl"
                    title={item.value.toLocaleString()}
                  >
                    {formatNumber(item.value)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Filters Section - Responsive Wrap */}
      <div className="flex justify-start gap-2">
        <Select>
          <SelectTrigger className="w-full sm:w-64 sm:shrink-0">
            <SelectValue
              placeholder="Filter Category"
              className="text-gray-900"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {totalUser.map((item) => {
                return <SelectItem value={item.name}>{item.name}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-full sm:shrink-0">
          <DatePickerDemo />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main Area Chart */}
        <Card className="overflow-hidden shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl">
              User Activity Analytics
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Displaying traffic patterns for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-4/3 w-full sm:aspect-auto sm:h-80"
            >
              <AreaChart
                data={chartData}
                margin={{ left: 12, right: 12, top: 12 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.2}
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 border-t px-6 py-4">
            <div className="flex items-center gap-2 leading-none font-semibold">
              Growth up by 8.4% this month{" "}
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-xs text-muted-foreground">
              Updated May 2026
            </div>
          </CardFooter>
        </Card>

        {/* System Health Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-slate-500 uppercase">
                  Server
                </span>
                <span className="text-sm font-semibold">Operational</span>
              </div>
              <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-slate-500 uppercase">
                  Latency
                </span>
                <span className="text-sm font-semibold">24ms</span>
              </div>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                Excellent
              </span>
            </div>
            <div className="rounded-xl border border-dashed p-4 text-center">
              <p className="text-xs leading-relaxed text-muted-foreground">
                All systems are operational. No critical issues reported in the
                last 24 hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
