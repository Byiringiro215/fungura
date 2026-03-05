import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const supplyData = [
  { month: "Mar", value: 180 },
  { month: "Apr", value: 160 },
  { month: "May", value: 80 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 261 },
  { month: "Aug", value: 200 },
  { month: "Sep", value: 190 },
  { month: "Oct", value: 210 },
];

const stockData = [
  { label: "1", v: 40 }, { label: "2", v: 35 }, { label: "3", v: 50 },
  { label: "4", v: 20 }, { label: "5", v: 45 }, { label: "6", v: 30 },
  { label: "7", v: 55 }, { label: "8", v: 25 }, { label: "9", v: 60 },
  { label: "10", v: 15 },
];

const inventoryItems = [
  { name: "Fresh Salmon", category: "Food Ingredients", status: "Available", stock: 45, reorder: 50 },
  { name: "Olive Oil", category: "Food Ingredients", status: "Low", stock: 10, reorder: 20 },
  { name: "Spaghetti Pasta", category: "Food Ingredients", status: "Available", stock: 50, reorder: 60 },
  { name: "Salt", category: "Food Ingredients", status: "Available", stock: 60, reorder: 30 },
  { name: "Black Pepper", category: "Food Ingredients", status: "Low", stock: 15, reorder: 20 },
  { name: "Butter", category: "Food Ingredients", status: "Available", stock: 40, reorder: 50 },
  { name: "Chef's Knife", category: "Kitchen Tools & Equipment", status: "Available", stock: 5, reorder: 10 },
  { name: "Cutting Board", category: "Kitchen Tools & Equipment", status: "Out of Stock", stock: 0, reorder: 15 },
  { name: "Dishwashing Detergent", category: "Cleaning Supplies", status: "Available", stock: 25, reorder: 20 },
  { name: "Mixing Bowls", category: "Kitchen Tools & Equipment", status: "Available", stock: 25, reorder: 15 },
];

const purchaseOrders = [
  { id: "PO1001", date: "Oct 01, 2035", item: "Fresh Salmon", itemCat: "Food Ingredients", vendor: "Ocean Fresh Suppliers", price: "$15.00", qty: 10, total: "$150.00", status: "Pending", delivery: 50, arrival: "Oct 10, 2035" },
  { id: "PO1002", date: "Oct 02, 2035", item: "Olive Oil", itemCat: "Food Ingredients", vendor: "Mediterranean Oils Co.", price: "$10.00", qty: 20, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 08, 2035" },
  { id: "PO1003", date: "Oct 03, 2035", item: "Spaghetti Pasta", itemCat: "Food Ingredients", vendor: "Italian Imports", price: "$3.50", qty: 50, total: "$175.00", status: "Delivered", delivery: 100, arrival: "Oct 05, 2035" },
  { id: "PO1004", date: "Oct 04, 2035", item: "Dishwashing Detergent", itemCat: "Cleaning Supplies", vendor: "CleanPro Supplies", price: "$12.00", qty: 15, total: "$180.00", status: "Pending", delivery: 30, arrival: "Oct 12, 2035" },
  { id: "PO1005", date: "Oct 05, 2035", item: "Espresso Machine", itemCat: "Kitchen Tools & Equipment", vendor: "Barista Equipment Inc.", price: "$150.00", qty: 1, total: "$150.00", status: "Delivered", delivery: 100, arrival: "Oct 07, 2035" },
  { id: "PO1006", date: "Oct 06, 2035", item: "White Plates", itemCat: "Kitchen Tools & Equipment", vendor: "Kitchen Essentials", price: "$2.00", qty: 100, total: "$200.00", status: "Shipped", delivery: 75, arrival: "Oct 09, 2035" },
  { id: "PO1007", date: "Oct 07, 2035", item: "Garlic Cloves", itemCat: "Food Ingredients", vendor: "Organic Farms", price: "$1.00", qty: 100, total: "$100.00", status: "Pending", delivery: 20, arrival: "Oct 15, 2035" },
  { id: "PO1008", date: "Oct 08, 2035", item: "Trash Bags", itemCat: "Cleaning Supplies", vendor: "Green Cleaning Solutions", price: "$0.50", qty: 200, total: "$100.00", status: "Delivered", delivery: 100, arrival: "Oct 08, 2035" },
];

const statusColor = (s: string) => {
  if (s === "Available") return "bg-green-100 text-green-700";
  if (s === "Low") return "bg-yellow-100 text-yellow-700";
  return "bg-gray-200 text-gray-600";
};

const poStatusColor = (s: string) => {
  if (s === "Pending") return "text-muted-foreground";
  if (s === "Shipped") return "text-primary";
  return "text-green-600";
};

export default function Inventory() {
  const [tab, setTab] = useState<"inventory" | "purchase">("inventory");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <DashboardLayout title="Inventory" breadcrumb="Inventory">
      {/* Charts row */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Supply Overview</p>
              <p className="text-2xl font-bold text-foreground">1,654</p>
            </div>
            <span className="text-xs text-muted-foreground">Last 8 Months ▾</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={supplyData}>
              <defs>
                <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#supplyGrad)" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Stock Level</p>
            <span className="text-xs text-muted-foreground">This Month ▾</span>
          </div>
          <p className="mb-1 text-3xl font-bold text-foreground">205 <span className="text-sm font-normal text-muted-foreground">Products</span></p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={stockData}>
              <Bar dataKey="v" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> In Stock <strong>120</strong></span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Low Stock <strong>55</strong></span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> Out of Stock <strong>30</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs and filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["inventory", "purchase"].map((t) => (
            <button key={t} onClick={() => setTab(t as any)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
              {t === "inventory" ? "Inventory" : "Purchase Order"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search for item" className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">All Category ▾</span>
          <span className="text-xs text-muted-foreground">All Status ▾</span>
          <button className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            <Plus className="h-4 w-4" /> {tab === "inventory" ? "Add Product" : "Add Purchase"}
          </button>
        </div>
      </div>

      {/* Table */}
      {tab === "inventory" ? (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3"><input type="checkbox" className="accent-primary" /></th>
                <th className="px-4 py-3">Item ⇅</th>
                <th className="px-4 py-3">Category ⇅</th>
                <th className="px-4 py-3">Status ⇅</th>
                <th className="px-4 py-3">Qty in Stock ⇅</th>
                <th className="px-4 py-3">Qty in Reorder ⇅</th>
                <th className="px-4 py-3">Action ⇅</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.name} className="border-b border-border last:border-0 hover:bg-accent/30">
                  <td className="px-4 py-3"><input type="checkbox" className="accent-primary" /></td>
                  <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${statusColor(item.status)}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.min((item.stock / item.reorder) * 100, 100)}%` }} />
                      </div>
                      <span className="text-foreground">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.reorder}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded border border-border px-3 py-1 text-xs hover:bg-accent">Reorder</button>
                      <button className="rounded bg-foreground px-3 py-1 text-xs text-background hover:opacity-90">Update Stock</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
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
      ) : (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="mb-0 flex items-center gap-2 px-4 pt-3">
            {["All", "Pending", "Shipped", "Delivered"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3"><input type="checkbox" className="accent-primary" /></th>
                <th className="px-4 py-3">Order ID ⇅</th>
                <th className="px-4 py-3">Item ⇅</th>
                <th className="px-4 py-3">Vendor/Supplier ⇅</th>
                <th className="px-4 py-3">Price ⇅</th>
                <th className="px-4 py-3">Qty ⇅</th>
                <th className="px-4 py-3">Total ⇅</th>
                <th className="px-4 py-3">Status ⇅</th>
                <th className="px-4 py-3">Delivery ⇅</th>
                <th className="px-4 py-3">Action ⇅</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders
                .filter((o) => statusFilter === "All" || o.status === statusFilter)
                .map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-accent/30">
                    <td className="px-4 py-3"><input type="checkbox" className="accent-primary" /></td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{o.id}</p>
                      <p className="text-xs text-muted-foreground">{o.date}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{o.item}</p>
                      <p className="text-xs text-muted-foreground">{o.itemCat}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{o.vendor}</td>
                    <td className="px-4 py-3 text-primary font-medium">{o.price}</td>
                    <td className="px-4 py-3">{o.qty}</td>
                    <td className="px-4 py-3 text-primary font-medium">{o.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${poStatusColor(o.status)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted">
                          <div className={`h-1.5 rounded-full ${o.delivery === 100 ? "bg-primary" : "bg-foreground"}`} style={{ width: `${o.delivery}%` }} />
                        </div>
                        <span className="text-xs">{o.delivery}%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Arrival: {o.arrival}</p>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded border border-border px-3 py-1 text-xs hover:bg-accent">Receive</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
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
      )}
    </DashboardLayout>
  );
}
