import DashboardLayout from "@/components/layout/DashboardLayout";
import { ClipboardList, Users, DollarSign, TrendingUp, TrendingDown, Star, ShoppingCart, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import foodChicken from "@/assets/food-chicken.jpg";
import foodCake from "@/assets/food-cake.jpg";
import foodShrimp from "@/assets/food-shrimp.jpg";
import foodSushi from "@/assets/food-sushi.jpg";
import foodPasta from "@/assets/food-pasta.jpg";
import foodBurger from "@/assets/food-burger.jpg";

const stats = [
  { label: "Total Orders", value: "48,652", change: 1.58, up: true, icon: ClipboardList },
  { label: "Total Customer", value: "1,248", change: 0.42, up: false, icon: Users },
  { label: "Total Revenue", value: "$215,860", change: 2.36, up: true, icon: DollarSign },
];

const revenueData = [
  { month: "Mar", income: 8000, expense: 5000 },
  { month: "Apr", income: 9500, expense: 6000 },
  { month: "May", income: 11000, expense: 5500 },
  { month: "Jun", income: 10000, expense: 7000 },
  { month: "Jul", income: 16580, expense: 8000 },
  { month: "Aug", income: 14000, expense: 9000 },
  { month: "Sep", income: 13000, expense: 7500 },
  { month: "Oct", income: 15000, expense: 8500 },
];

const ordersOverview = [
  { day: "Mon", orders: 80 },
  { day: "Tue", orders: 100 },
  { day: "Wed", orders: 120 },
  { day: "Thu", orders: 185 },
  { day: "Fri", orders: 140 },
  { day: "Sat", orders: 160 },
  { day: "Sun", orders: 130 },
];

const categoryData = [
  { name: "Seafood", value: 30, color: "hsl(24, 95%, 53%)" },
  { name: "Beverages", value: 25, color: "hsl(30, 50%, 70%)" },
  { name: "Dessert", value: 25, color: "hsl(20, 10%, 25%)" },
  { name: "Pasta", value: 20, color: "hsl(30, 20%, 85%)" },
];

const orderTypes = [
  { label: "Dine-In", pct: 45, value: 900 },
  { label: "Takeaway", pct: 30, value: 600 },
  { label: "Online", pct: 25, value: 500 },
];

const recentOrders = [
  { id: "ORD1025", menu: "Salmon Sushi Roll", category: "Seafood", qty: 3, amount: "$30.00", customer: "Dana White", status: "On Process", img: foodSushi },
  { id: "ORD1026", menu: "Spaghetti Carbonara", category: "Pasta", qty: 1, amount: "$15.00", customer: "Eve Carter", status: "Cancelled", img: foodPasta },
  { id: "ORD1027", menu: "Classic Cheeseburger", category: "Burger", qty: 1, amount: "$10.00", customer: "Charlie Brown", status: "Completed", img: foodBurger },
];

const trendingMenus = [
  { name: "Grilled Chicken Delight", category: "Chicken", rating: 4.9, orders: 350, price: "$18.00", img: foodChicken },
  { name: "Sunny Citrus Cake", category: "Dessert", rating: 4.8, orders: 400, price: "$8.50", img: foodCake },
  { name: "Fiery Shrimp Salad", category: "Seafood", rating: 4.7, orders: 270, price: "$12.00", img: foodShrimp },
];

const statusColors: Record<string, string> = {
  "On Process": "bg-foreground text-card",
  Completed: "bg-success text-success-foreground",
  Cancelled: "bg-foreground text-card",
};

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Hello Orlando, welcome back!">
      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <s.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
                <div className={`ml-auto flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.change}%
                </div>
              </div>
            ))}
          </div>

          {/* Revenue + Categories */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Total Revenue</h3>
                <span className="text-xs text-muted-foreground">Last 8 Months ▾</span>
              </div>
              <p className="mb-2 text-2xl font-bold text-foreground">$184,839</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 20% 92%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="income" stroke="hsl(24, 95%, 53%)" fill="hsl(24, 95%, 53%)" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="expense" stroke="hsl(20, 10%, 25%)" fill="hsl(20, 10%, 25%)" fillOpacity={0.05} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-2 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Top Categories</h3>
                <span className="text-xs text-muted-foreground">This Month ▾</span>
              </div>
              <div className="flex justify-center">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 justify-center">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                    {c.name} {c.value}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Overview + Order Types */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Orders Overview</h3>
                <span className="text-xs text-muted-foreground">This Week ▾</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={ordersOverview}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 20% 92%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-2 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Order Types</h3>
                <span className="text-xs text-muted-foreground">This Month ▾</span>
              </div>
              <div className="space-y-5">
                {orderTypes.map((ot) => (
                  <div key={ot.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{ot.label} {ot.pct}%</span>
                      <span className="text-muted-foreground">{ot.value}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-foreground" style={{ width: `${ot.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Recent Orders</h3>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground">
                See All Orders
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Photo</th>
                  <th className="pb-3 font-medium">Menu</th>
                  <th className="pb-3 font-medium">Qty</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-muted-foreground">{o.id}</td>
                    <td className="py-3">
                      <img src={o.img} alt={o.menu} className="h-9 w-9 rounded-lg object-cover" />
                    </td>
                    <td className="py-3">
                      <p className="font-medium text-foreground">{o.menu}</p>
                      <p className="text-xs text-muted-foreground">{o.category}</p>
                    </td>
                    <td className="py-3 text-muted-foreground">{o.qty}</td>
                    <td className="py-3 font-semibold text-primary">{o.amount}</td>
                    <td className="py-3 text-muted-foreground">{o.customer}</td>
                    <td className="py-3">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[260px] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Trending Menus</h3>
            <span className="text-xs text-muted-foreground">This Week ▾</span>
          </div>
          {trendingMenus.map((m) => (
            <div key={m.name} className="rounded-xl bg-card shadow-sm overflow-hidden">
              <img src={m.img} alt={m.name} className="h-36 w-full object-cover" />
              <div className="p-3">
                <h4 className="font-bold text-foreground text-sm">{m.name}</h4>
                <p className="text-xs text-muted-foreground">{m.category}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-warning" />{m.rating}</span>
                    <span className="flex items-center gap-0.5"><ShoppingCart className="h-3 w-3" />{m.orders}</span>
                  </div>
                  <span className="font-bold text-primary">{m.price}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Recent Activity */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                { name: "Sylvester Quilt", role: "Inventory Manager", action: 'updated inventory - 10 units of "Organic Chicken Breast"', time: "11:20 AM" },
                { name: "Maria Kings", role: "Kitchen Admin", action: "marked order #ORD1028 as completed", time: "11:00 AM" },
                { name: "William Smith", role: "Receptionist", action: "added new reservation for 4 guests at 7:00 PM", time: "10:30 AM" },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex-shrink-0" />
                  <div>
                    <p className="text-xs">
                      <span className="font-semibold text-foreground">{a.name}</span>
                      <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{a.role}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{a.action}</p>
                    <p className="text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
