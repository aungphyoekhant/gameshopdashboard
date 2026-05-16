import { useState } from "react"
import { Check, X, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

// Data Structure Type သတ်မှတ်ခြင်း
interface TransactionItem {
  id: string
  gamename: string
  gameid: string
  amount: string
  price: number
  transaction_image: string
  state: "Approved" | "Pending" | "Rejected" | string
}

export default function Users() {
  // မင်းပေးထားတဲ့ JSON Data ကို ပြန်လည်အသုံးပြုထားပါတယ်
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: "TX-1001",
      gamename: "Mobile Legends",
      gameid: "48920152 (2041)",
      amount: "1050 Diamonds",
      price: 15.5,
      transaction_image:
        "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
      state: "Approved",
    },
    {
      id: "TX-1002",
      gamename: "PUBG Mobile",
      gameid: "5129304812",
      amount: "660 UC",
      price: 9.99,
      transaction_image:
        "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
      state: "Pending",
    },
    {
      id: "TX-1003",
      gamename: "Subway Surfers",
      gameid: "subway_player99",
      amount: "50,000 Coins",
      price: 4.99,
      transaction_image:
        "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
      state: "Rejected",
    },
    {
      id: "TX-1004",
      gamename: "Free Fire",
      gameid: "88231047",
      amount: "530 Diamonds",
      price: 5.0,
      transaction_image:
        "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
      state: "Approved",
    },
    {
      id: "TX-1005",
      gamename: "PUBG Mobile",
      gameid: "539102472",
      amount: "1800 UC",
      price: 24.99,
      transaction_image:
        "https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg",
      state: "Pending",
    },
  ])

  // Receipt Preview ပေါ့ပ်အပ်အတွက် State
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Actions ခလုတ်များအတွက် Logic
  const handleApprove = (id: string) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, state: "Approved" } : item
      )
    )
  }

  const handleReject = (id: string) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, state: "Rejected" } : item
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete ${id}?`)) {
      setTransactions((prev) => prev.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="mx-auto w-full p-4 sm:p-6">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Game Top-up Orders
        </h1>
        <p className="text-sm text-slate-500">
          Manage, approve or reject game currency transactions efficiently.
        </p>
      </div>

      {/* Main Table Wrapper */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          {/* table width ကို fixed ကြီး မပိတ်ထားတော့ဘဲ auto အချိုးကျ ဖြစ်စေပါတယ် */}
          <table className="w-full table-auto border-collapse text-left text-sm whitespace-nowrap text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-700 uppercase">
              <tr>
                {/* 📱 ဖုန်းမှာပါ ပေါ်မည့် ကော်လံများ */}
                <th className="px-4 py-4 sm:px-6">Game Name</th>
                <th className="px-4 py-4 sm:px-6">Package</th>
                <th className="px-4 py-4 sm:px-6">Price</th>
                <th className="px-4 py-4 sm:px-6">Status</th>

                {/* 💻 Screen ကျယ်မှသာ ပေါ်မည့် ကော်လံများ (hidden md:table-cell) */}
                <th className="hidden px-6 py-4 md:table-cell">
                  Transaction ID
                </th>
                <th className="hidden px-6 py-4 md:table-cell">Player ID</th>
                <th className="hidden px-6 py-4 md:table-cell">Receipt</th>

                <th className="px-4 py-4 text-center sm:px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {transactions.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  {/* ၁။ Game Name */}
                  <td className="px-4 py-4 font-semibold text-slate-900 sm:px-6">
                    {item.gamename}
                  </td>

                  {/* ၂။ Package Amount */}
                  <td className="px-4 py-4 sm:px-6">
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
                      {item.amount}
                    </span>
                  </td>

                  {/* ၃။ Price */}
                  <td className="px-4 py-4 font-bold text-slate-800 sm:px-6">
                    ${item.price.toFixed(2)}
                  </td>

                  {/* ၄။ Status Badge */}
                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        item.state === "Approved"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                          : item.state === "Rejected"
                            ? "bg-rose-50 text-rose-700 ring-rose-600/20"
                            : "bg-amber-50 text-amber-700 ring-amber-600/20"
                      }`}
                    >
                      <span
                        className={`mr-1 h-1 w-1 rounded-full ${
                          item.state === "Approved"
                            ? "bg-emerald-500"
                            : item.state === "Rejected"
                              ? "bg-rose-500"
                              : "bg-amber-500"
                        }`}
                      />
                      {item.state}
                    </span>
                  </td>

                  {/* ၅။ Transaction ID (💻 ဖုန်းမှာ ဖျောက်ထားမည်) */}
                  <td className="hidden px-6 py-4 font-mono text-xs text-slate-400 md:table-cell">
                    {item.id}
                  </td>

                  {/* ၆။ Player ID (💻 ဖုန်းမှာ ဖျောက်ထားမည်) */}
                  <td className="hidden px-6 py-4 font-mono text-xs text-slate-600 md:table-cell">
                    {item.gameid}
                  </td>

                  {/* ၇။ Receipt Image (💻 ဖုန်းမှာ ဖျောက်ထားမည်) */}
                  <td className="hidden px-6 py-4 md:table-cell">
                    <div className="group relative h-9 w-9 overflow-hidden rounded-md border border-slate-200">
                      <img
                        src={item.transaction_image}
                        alt="Receipt"
                        className="h-full w-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedImage(item.transaction_image)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        <Eye size={12} />
                      </button>
                    </div>
                  </td>

                  {/* ၈။ Actions Buttons (Responsive ပုံစံ ခလုတ်တိုလေးများဖြင့် ညှိထားသည်) */}
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex justify-center gap-1">
                      <Button
                        size="sm"
                        disabled={item.state === "Approved"}
                        onClick={() => handleApprove(item.id)}
                        className="h-8 bg-emerald-600 px-2 text-xs text-white hover:bg-emerald-700 disabled:opacity-30"
                      >
                        <Check size={13} className="sm:mr-1" />
                        <span className="hidden sm:inline">Approve</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={item.state === "Rejected"}
                        onClick={() => handleReject(item.id)}
                        className="h-8 border-rose-200 px-2 text-xs text-rose-600 hover:bg-rose-50 disabled:opacity-30"
                      >
                        <X size={13} className="sm:mr-1" />
                        <span className="hidden sm:inline">Reject</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 border border-slate-200 bg-slate-50 px-2 text-slate-500 hover:bg-rose-600 hover:text-white"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 p-4 backdrop-blur-xs duration-200 fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-sm overflow-hidden rounded-xl bg-white p-1 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs text-white hover:bg-black/70"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Receipt Preview"
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
