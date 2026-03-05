import DashboardLayout from "@/components/layout/DashboardLayout";
import { ClipboardList, RefreshCw, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const summaryCards = [
  { label: "Total Orders", value: "200", icon: ClipboardList },
  { label: "On Process", value: "45", icon: RefreshCw },
  { label: "Completed", value: "140", icon: CheckCircle2 },
  { label: "Canceled", value: "15", icon: XCircle },
];

const overviewData = [
  { day: "Sun", value: 100 }, { day: "Mon", value: 180 },
  { day: "Tue", value: 200 }, { day: "Wed", value: 250 },
  { day: "Thu", value: 301 }, { day: "Fri", value: 220 },
  { day: "Sat", value: 280 },
];

const typeData = [
  { name: "Dine In", value: 75, color: "hsl(24, 95%, 53%)" },
  { name: "Takeaway", value: 60, color: "hsl(30, 50%, 70%)" },
  { name: "Online", value: 65, color: "hsl(20, 10%, 25%)" },
];

const orders = [
  { id: "ORD1023", date: "2035-10-20", time: "02:47 PM", customer: "Alice Johnson", type: "Dine-In", address: "-", qty: 1, amount: "$18.00", status: "Completed" },
  { id: "ORD1024", date: "2035-10-26", time: "12:47 AM", customer: "Bob Smith", type: "Takeaway", address: "-", qty: 2, amount: "$24.00", status: "Cancelled" },
  { id: "ORD1025", date: "2035-10-23", time: "10:47 PM", customer: "Charlie Brown", type: "Dine-In", address: "-", qty: 1, amount: "$10.00", status: "Completed" },
  { id: "ORD1026", date: "2035-10-23", time: "01:47 PM", customer: "Dana White", type: "Dine-In", address: "-", qty: 3, amount: "$30.00", status: "On Process" },
  { id: "ORD1027", date: "2035-10-26", time: "03:47 PM", customer: "Eve Carter", type: "Online", address: "123 Elm Street", qty: 1, amount: "$15.00", status: "Completed" },
  { id: "ORD1028", date: "2035-10-22", time: "11:47 AM", customer: "Frank Miller", type: "Online", address: "456 Pine Avenue", qty: 4, amount: "$35.00", status: "Completed" },
  { id: "ORD1029", date: "2035-10-27", time: "09:47 AM", customer: "Grace Lee", type: "Takeaway", address: "-", qty: 2, amount: "$22.00", status: "Cancelled" },
  { id: "ORD1030", date: "2035-10-26", time: "08:47 AM", customer: "Hannah Gold", type: "Dine-In", address: "-", qty: 3, amount: "$36.00", status: "On Process" },
];

const tabs = ["All", "On Process", "Completed", "Cancelled"];

const statusStyles: Record<string, string> = {
  Completed: "bg-success text-success-foreground",
  "On Process": "bg-primary text-primary-foreground",
  Cancelled: "bg-foreground text-card",
};

const typeDot: Record<string, string> = {
  "Dine-In": "bg-destructive",
  Takeaway: "bg-warning",
  Online: "bg-foreground",
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <DashboardLayout title="Orders" breadcrumb="Customer Orders">
      {/* Top stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {summaryCards.map((s) => (
            <div key={s.label} className="flex flex-col rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <s.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2 rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Orders Overview</h3>
            <span className="text-xs text-muted-foreground">This Week ▾</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={overviewData}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(20 10% 45%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(20 10% 45%)" }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(24, 95%, 53%)" fill="hsl(24, 95%, 53%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Order Types</h3>
            <span className="text-xs text-muted-foreground">Today ▾</span>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {typeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {typeData.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                  {t.name}
                </span>
                {t.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card p-5 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Order Type</th>
              <th className="pb-3 font-medium">Address</th>
              <th className="pb-3 font-medium">Qty</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 cursor-pointer hover:bg-accent/30 transition-colors">
                <td className="py-3 text-muted-foreground">{o.id}</td>
                <td className="py-3">
                  <p className="text-foreground">{o.date}</p>
                  <p className="text-xs text-muted-foreground">{o.time}</p>
                </td>
                <td className="py-3 text-foreground">{o.customer}</td>
                <td className="py-3">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${typeDot[o.type] || "bg-muted-foreground"}`} />
                    {o.type}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground">{o.address}</td>
                <td className="py-3 text-muted-foreground">{o.qty}</td>
                <td className="py-3 font-semibold text-primary">{o.amount}</td>
                <td className="py-3">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 10 ▾ out of 312</span>
          <div className="flex items-center gap-1">
            <button className="rounded px-2 py-1 hover:bg-accent">‹</button>
            <button className="rounded bg-primary px-2.5 py-1 text-primary-foreground">1</button>
            <button className="rounded px-2 py-1 hover:bg-accent">2</button>
            <button className="rounded px-2 py-1 hover:bg-accent">3</button>
            <span>...</span>
            <button className="rounded px-2 py-1 hover:bg-accent">16</button>
            <button className="rounded px-2 py-1 hover:bg-accent">›</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
