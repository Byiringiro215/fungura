import DashboardLayout from "@/components/layout/DashboardLayout";
import { ClipboardList, Users, DollarSign, TrendingUp, TrendingDown, Star, ShoppingCart, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import foodChicken from "@/assets/food-chicken.jpg";
import foodCake from "@/assets/food-cake.jpg";
import foodShrimp from "@/assets/food-shrimp.jpg";
import foodSushi from "@/assets/food-sushi.jpg";
import foodPasta from "@/assets/food-pasta.jpg";
import foodBurger from "@/assets/food-burger.jpg";

const revenueDataByPeriod = {
  "This Week": [
    { month: "Mon", income: 1200, expense: 800 },
    { month: "Tue", income: 1400, expense: 900 },
    { month: "Wed", income: 1600, expense: 850 },
    { month: "Thu", income: 1800, expense: 1000 },
    { month: "Fri", income: 2100, expense: 1100 },
    { month: "Sat", income: 2300, expense: 1200 },
    { month: "Sun", income: 1900, expense: 950 },
  ],
  "This Month": [
    { month: "Week 1", income: 8500, expense: 5200 },
    { month: "Week 2", income: 9800, expense: 6100 },
    { month: "Week 3", income: 8900, expense: 5800 },
    { month: "Week 4", income: 10200, expense: 6500 },
  ],
  "This Year": [
    { month: "Jan", income: 32000, expense: 20000 },
    { month: "Feb", income: 29500, expense: 19000 },
    { month: "Mar", income: 35000, expense: 21500 },
    { month: "Apr", income: 31000, expense: 20500 },
    { month: "May", income: 38000, expense: 22000 },
    { month: "Jun", income: 42000, expense: 24000 },
    { month: "Jul", income: 45800, expense: 26000 },
    { month: "Aug", income: 41000, expense: 25000 },
    { month: "Sep", income: 39000, expense: 23500 },
    { month: "Oct", income: 43000, expense: 25500 },
    { month: "Nov", income: 40000, expense: 24000 },
    { month: "Dec", income: 46000, expense: 27000 },
  ],
};

const ordersOverviewByPeriod = {
  "This Week": [
    { day: "Mon", orders: 80 },
    { day: "Tue", orders: 100 },
    { day: "Wed", orders: 120 },
    { day: "Thu", orders: 185 },
    { day: "Fri", orders: 140 },
    { day: "Sat", orders: 160 },
    { day: "Sun", orders: 130 },
  ],
  "This Month": [
    { day: "Week 1", orders: 520 },
    { day: "Week 2", orders: 680 },
    { day: "Week 3", orders: 590 },
    { day: "Week 4", orders: 715 },
  ],
  "This Year": [
    { day: "Jan", orders: 2100 },
    { day: "Feb", orders: 1950 },
    { day: "Mar", orders: 2300 },
    { day: "Apr", orders: 2150 },
    { day: "May", orders: 2400 },
    { day: "Jun", orders: 2600 },
    { day: "Jul", orders: 2800 },
    { day: "Aug", orders: 2650 },
    { day: "Sep", orders: 2500 },
    { day: "Oct", orders: 2750 },
    { day: "Nov", orders: 2550 },
    { day: "Dec", orders: 2900 },
  ],
};

const categoryDataByPeriod = {
  "This Week": [
    { name: "Seafood", i18nKey: "seafood", value: 35, color: "hsl(24, 95%, 53%)" },
    { name: "Beverages", i18nKey: "beverages", value: 20, color: "hsl(30, 50%, 70%)" },
    { name: "Dessert", i18nKey: "desserts", value: 25, color: "hsl(20, 10%, 25%)" },
    { name: "Pasta", i18nKey: "pasta", value: 20, color: "hsl(30, 20%, 85%)" },
  ],
  "This Month": [
    { name: "Seafood", i18nKey: "seafood", value: 30, color: "hsl(24, 95%, 53%)" },
    { name: "Beverages", i18nKey: "beverages", value: 25, color: "hsl(30, 50%, 70%)" },
    { name: "Dessert", i18nKey: "desserts", value: 25, color: "hsl(20, 10%, 25%)" },
    { name: "Pasta", i18nKey: "pasta", value: 20, color: "hsl(30, 20%, 85%)" },
  ],
  "This Year": [
    { name: "Seafood", i18nKey: "seafood", value: 28, color: "hsl(24, 95%, 53%)" },
    { name: "Beverages", i18nKey: "beverages", value: 22, color: "hsl(30, 50%, 70%)" },
    { name: "Dessert", i18nKey: "desserts", value: 30, color: "hsl(20, 10%, 25%)" },
    { name: "Pasta", i18nKey: "pasta", value: 20, color: "hsl(30, 20%, 85%)" },
  ],
};

const orderTypesByPeriod = {
  "This Week": [
    { label: "Dine-In", i18nKey: "dine_in", pct: 50, value: 180 },
    { label: "Takeaway", i18nKey: "takeaway", pct: 28, value: 100 },
    { label: "Online", i18nKey: "online", pct: 22, value: 80 },
  ],
  "This Month": [
    { label: "Dine-In", i18nKey: "dine_in", pct: 45, value: 900 },
    { label: "Takeaway", i18nKey: "takeaway", pct: 30, value: 600 },
    { label: "Online", i18nKey: "online", pct: 25, value: 500 },
  ],
  "This Year": [
    { label: "Dine-In", i18nKey: "dine_in", pct: 42, value: 10500 },
    { label: "Takeaway", i18nKey: "takeaway", pct: 33, value: 8250 },
    { label: "Online", i18nKey: "online", pct: 25, value: 6250 },
  ],
};

const recentOrders = [
  { id: "ORD1025", menu: "Salmon Sushi Roll", category: "Seafood", i18nCategory: "seafood", qty: 3, amount: "$30.00", customer: "Dana White", status: "On Process", img: foodSushi },
  { id: "ORD1026", menu: "Spaghetti Carbonara", category: "Pasta", i18nCategory: "pasta", qty: 1, amount: "$15.00", customer: "Eve Carter", status: "Cancelled", img: foodPasta },
  { id: "ORD1027", menu: "Classic Cheeseburger", category: "Burger", i18nCategory: "burgers", qty: 1, amount: "$10.00", customer: "Charlie Brown", status: "Completed", img: foodBurger },
];

const trendingMenusByPeriod = {
  "This Week": [
    { name: "Grilled Chicken Delight", category: "Chicken", i18nCategory: "chicken", rating: 4.9, orders: 85, price: "$18.00", img: foodChicken },
    { name: "Sunny Citrus Cake", category: "Dessert", i18nCategory: "desserts", rating: 4.8, orders: 92, price: "$8.50", img: foodCake },
    { name: "Fiery Shrimp Salad", category: "Seafood", i18nCategory: "seafood", rating: 4.7, orders: 68, price: "$12.00", img: foodShrimp },
  ],
  "This Month": [
    { name: "Grilled Chicken Delight", category: "Chicken", i18nCategory: "chicken", rating: 4.9, orders: 350, price: "$18.00", img: foodChicken },
    { name: "Sunny Citrus Cake", category: "Dessert", i18nCategory: "desserts", rating: 4.8, orders: 400, price: "$8.50", img: foodCake },
    { name: "Fiery Shrimp Salad", category: "Seafood", i18nCategory: "seafood", rating: 4.7, orders: 270, price: "$12.00", img: foodShrimp },
  ],
  "This Year": [
    { name: "Grilled Chicken Delight", category: "Chicken", i18nCategory: "chicken", rating: 4.9, orders: 4200, price: "$18.00", img: foodChicken },
    { name: "Sunny Citrus Cake", category: "Dessert", i18nCategory: "desserts", rating: 4.8, orders: 4800, price: "$8.50", img: foodCake },
    { name: "Fiery Shrimp Salad", category: "Seafood", i18nCategory: "seafood", rating: 4.7, orders: 3240, price: "$12.00", img: foodShrimp },
  ],
};

const statusColors: Record<string, string> = {
  "On Process": "bg-foreground text-card",
  Completed: "bg-success text-success-foreground",
  Cancelled: "bg-foreground text-card",
};

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { label: t("total_orders"), value: "48,652", change: 1.58, up: true, icon: ClipboardList },
    { label: t("total_customer"), value: "1,248", change: 0.42, up: false, icon: Users },
    { label: t("total_revenue"), value: "$215,860", change: 2.36, up: true, icon: DollarSign },
  ];

  const [ordersOverviewPeriod, setOrdersOverviewPeriod] = useState<"This Week" | "This Month" | "This Year">("This Week");
  const [revenuePeriod, setRevenuePeriod] = useState<"This Week" | "This Month" | "This Year">("This Year");
  const [categoryPeriod, setCategoryPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const [orderTypesPeriod, setOrderTypesPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const [trendingPeriod, setTrendingPeriod] = useState<"This Week" | "This Month" | "This Year">("This Week");

  return (
    <DashboardLayout title={t("dashboard")} subtitle={t("welcome_msg")}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">{t("total_revenue")}</h3>
                <select
                  value={revenuePeriod}
                  onChange={(e) => setRevenuePeriod(e.target.value as "This Week" | "This Month" | "This Year")}
                  className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="This Week">{t("this_week")}</option>
                  <option value="This Month">{t("this_month")}</option>
                  <option value="This Year">{t("this_year")}</option>
                </select>
              </div>
              <p className="mb-2 text-2xl font-bold text-foreground">$184,839</p>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={revenueDataByPeriod[revenuePeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 20% 92%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="income" stroke="hsl(24, 95%, 53%)" fill="hsl(24, 95%, 53%)" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="expense" stroke="hsl(20, 10%, 25%)" fill="hsl(20, 10%, 25%)" fillOpacity={0.05} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-2 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">{t("top_categories")}</h3>
                <select
                  value={categoryPeriod}
                  onChange={(e) => setCategoryPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
                  className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="This Week">{t("this_week")}</option>
                  <option value="This Month">{t("this_month")}</option>
                  <option value="This Year">{t("this_year")}</option>
                </select>
              </div>
              <div className="flex justify-center">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie data={categoryDataByPeriod[categoryPeriod]} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                      {categoryDataByPeriod[categoryPeriod].map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categoryDataByPeriod[categoryPeriod].map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                    {t(c.i18nKey)} {c.value}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Overview + Order Types */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">{t("orders_overview")}</h3>
                <select
                  value={ordersOverviewPeriod}
                  onChange={(e) => setOrdersOverviewPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
                  className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="This Week">{t("this_week")}</option>
                  <option value="This Month">{t("this_month")}</option>
                  <option value="This Year">{t("this_year")}</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={ordersOverviewByPeriod[ordersOverviewPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 20% 92%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(20 10% 45%)" }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-2 rounded-xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">{t("order_types")}</h3>
                <select
                  value={orderTypesPeriod}
                  onChange={(e) => setOrderTypesPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
                  className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="This Week">{t("this_week")}</option>
                  <option value="This Month">{t("this_month")}</option>
                  <option value="This Year">{t("this_year")}</option>
                </select>
              </div>
              <div className="space-y-5">
                {orderTypesByPeriod[orderTypesPeriod].map((ot) => (
                  <div key={ot.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{t(ot.i18nKey)} {ot.pct}%</span>
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
          <div className="rounded-xl bg-card p-5 shadow-sm overflow-x-auto">
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-base font-bold text-foreground">{t("recent_orders")}</h3>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground">
                {t("see_all")}
              </button>
            </div>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">{t("order_id")}</th>
                    <th className="pb-3 font-medium">{t("photo")}</th>
                    <th className="pb-3 font-medium">{t("menu_label")}</th>
                    <th className="pb-3 font-medium">{t("qty")}</th>
                    <th className="pb-3 font-medium">{t("amount")}</th>
                    <th className="pb-3 font-medium">{t("customer")}</th>
                    <th className="pb-3 font-medium">{t("status")}</th>
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
                        <p className="text-xs text-muted-foreground">{t(o.i18nCategory)}</p>
                      </td>
                      <td className="py-3 text-muted-foreground">{o.qty}</td>
                      <td className="py-3 font-semibold text-primary">{o.amount}</td>
                      <td className="py-3 text-muted-foreground">{o.customer}</td>
                      <td className="py-3">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[o.status]}`}>
                          {o.status === "On Process" ? t("on_process") : o.status === "Completed" ? t("completed") : t("cancelled")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="rounded-lg border border-border p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <img src={o.img} alt={o.menu} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.menu}</p>
                      </div>
                    </div>
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusColors[o.status]}`}>
                      {o.status === "On Process" ? t("on_process") : o.status === "Completed" ? t("completed") : t("cancelled")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t("qty")}: {o.qty}</span>
                    <span className="font-semibold text-primary">{o.amount}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{t("customer")}: {o.customer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-[260px] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-foreground">{t("trending_menus")}</h3>
            <select
              value={trendingPeriod}
              onChange={(e) => setTrendingPeriod(e.target.value as "This Week" | "This Month" | "This Year")}
              className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="This Week">{t("this_week")}</option>
              <option value="This Month">{t("this_month")}</option>
              <option value="This Year">{t("this_year")}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {trendingMenusByPeriod[trendingPeriod].map((m) => (
              <div
                key={m.name}
                onClick={() => navigate(`/menu/${m.name.toLowerCase().replace(/\s+/g, "-")}`)}
                className="rounded-xl bg-card shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
              >
                <img src={m.img} alt={m.name} className="h-36 w-full object-cover" />
                <div className="p-3">
                  <h4 className="font-bold text-foreground text-sm">{m.name}</h4>
                  <p className="text-xs text-muted-foreground">{t(m.i18nCategory)}</p>
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
          </div>

          {/* Recent Activity */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">{t("recent_activity")}</h3>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                { name: "Sylvester Quilt", role: t("inventory_manager"), action: t("action_updated_inventory", { units: 10, item: '"Organic Chicken Breast"' }), time: "11:20 AM" },
                { name: "Maria Kings", role: t("kitchen_admin"), action: t("action_marked_completed", { id: "#ORD1028" }), time: "11:00 AM" },
                { name: "William Smith", role: t("receptionist"), action: t("action_new_reservation", { guests: 4, time: "7:00 PM" }), time: "10:30 AM" },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs">
                      <span className="font-semibold text-foreground">{a.name}</span>
                      <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{a.role}</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{a.action}</p>
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
