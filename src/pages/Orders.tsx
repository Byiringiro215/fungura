import DashboardLayout from "@/components/layout/DashboardLayout";
import { ClipboardList, RefreshCw, CheckCircle2, XCircle, MoreHorizontal, LayoutGrid, Table, Plus, X, Trash2, Eye } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const overviewDataByPeriod = {
  "This Week": [
    { day: "Sun", value: 100 }, { day: "Mon", value: 180 },
    { day: "Tue", value: 200 }, { day: "Wed", value: 250 },
    { day: "Thu", value: 301 }, { day: "Fri", value: 220 },
    { day: "Sat", value: 280 },
  ],
  "This Month": [
    { day: "Week 1", value: 850 }, { day: "Week 2", value: 1020 },
    { day: "Week 3", value: 950 }, { day: "Week 4", value: 1150 },
  ],
  "This Year": [
    { day: "Jan", value: 3200 }, { day: "Feb", value: 2950 },
    { day: "Mar", value: 3500 }, { day: "Apr", value: 3250 },
    { day: "May", value: 3800 }, { day: "Jun", value: 4100 },
    { day: "Jul", value: 4300 }, { day: "Aug", value: 4050 },
    { day: "Sep", value: 3900 }, { day: "Oct", value: 4200 },
    { day: "Nov", value: 3950 }, { day: "Dec", value: 4500 },
  ],
};

const typeDataByPeriod = {
  "This Week": [
    { name: "Dine In", nameKey: "dine_in", value: 50, color: "hsl(24, 95%, 53%)" },
    { name: "Takeaway", nameKey: "takeaway", value: 28, color: "hsl(30, 50%, 70%)" },
    { name: "Online", nameKey: "online", value: 22, color: "hsl(20, 10%, 25%)" },
  ],
  "This Month": [
    { name: "Dine In", nameKey: "dine_in", value: 45, color: "hsl(24, 95%, 53%)" },
    { name: "Takeaway", nameKey: "takeaway", value: 30, color: "hsl(30, 50%, 70%)" },
    { name: "Online", nameKey: "online", value: 25, color: "hsl(20, 10%, 25%)" },
  ],
  "This Year": [
    { name: "Dine In", nameKey: "dine_in", value: 42, color: "hsl(24, 95%, 53%)" },
    { name: "Takeaway", nameKey: "takeaway", value: 33, color: "hsl(30, 50%, 70%)" },
    { name: "Online", nameKey: "online", value: 25, color: "hsl(20, 10%, 25%)" },
  ],
};

const orders = [
  {
    id: "ORD1023",
    date: "Sat, October 20, 2035",
    time: "02:47 PM",
    customer: "Alice Johnson",
    type: "Dine-In",
    address: "-",
    qty: 2,
    amount: "$26.00",
    status: "Completed",
    items: [
      { name: "Classic Italian Penne", qty: 1, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
      { name: "Caesar Salad", qty: 1, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop" }
    ],
    table: "12"
  },
  {
    id: "ORD1024",
    date: "Sat, October 20, 2035",
    time: "12:47 AM",
    customer: "Bob Smith",
    type: "Takeaway",
    address: "-",
    qty: 2,
    amount: "$37.00",
    status: "Cancelled",
    items: [
      { name: "Pepperoni Pizza", qty: 1, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
      { name: "Garlic Bread", qty: 1, image: "https://images.unsplash.com/photo-1573140401552-388e3ead0b5e?w=400&h=300&fit=crop" },
      { name: "Lemon Tart", qty: 1, image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "ORD1025",
    date: "Sat, October 23, 2035",
    time: "01:47 PM",
    customer: "Dana White",
    type: "Dine-In",
    address: "-",
    qty: 3,
    amount: "$36.00",
    status: "On Process",
    items: [
      { name: "Salmon Sushi Roll", qty: 2, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop" },
      { name: "Edamame", qty: 1, image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop" }
    ],
    table: "8"
  },
  {
    id: "ORD1026",
    date: "Sat, October 26, 2035",
    time: "03:47 PM",
    customer: "Eve Carter",
    type: "Dine-In",
    address: "-",
    qty: 2,
    amount: "$20.00",
    status: "On Process",
    items: [
      { name: "Spaghetti Carbonara", qty: 1, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop" },
      { name: "Garlic Bread", qty: 1, image: "https://images.unsplash.com/photo-1573140401552-388e3ead0b5e?w=400&h=300&fit=crop" }
    ],
    table: "7"
  },
  {
    id: "ORD1027",
    date: "Sat, October 27, 2035",
    time: "09:47 AM",
    customer: "Grace Lee",
    type: "Takeaway",
    address: "-",
    qty: 3,
    amount: "$27.00",
    status: "Completed",
    items: [
      { name: "Vegan Buddha Bowl", qty: 2, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
      { name: "Iced Caramel Macchiato", qty: 1, image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "ORD1028",
    date: "Sat, October 28, 2035",
    time: "08:47 AM",
    customer: "Hannah Gold",
    type: "Dine-In",
    address: "-",
    qty: 3,
    amount: "$36.00",
    status: "Cancelled",
    items: [
      { name: "Grilled Chicken Delight", qty: 1, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop" },
      { name: "Smokey Supreme Pizza", qty: 2, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
      { name: "Tiramisu", qty: 1, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
    ],
    table: "4"
  },
  {
    id: "ORD1029",
    date: "Sat, October 29, 2035",
    time: "10:30 AM",
    customer: "Ian Foster",
    type: "Delivery",
    address: "123 Main St",
    qty: 2,
    amount: "$28.00",
    status: "Completed",
    items: [
      { name: "Beef Burger", qty: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
      { name: "French Fries", qty: 2, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "ORD1030",
    date: "Sat, October 30, 2035",
    time: "11:15 AM",
    customer: "Julia Martinez",
    type: "Dine-In",
    address: "-",
    qty: 4,
    amount: "$45.00",
    status: "On Process",
    items: [
      { name: "Ribeye Steak", qty: 2, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
      { name: "Mashed Potatoes", qty: 2, image: "https://images.unsplash.com/photo-1585238341710-4a1b0d2d1b5d?w=400&h=300&fit=crop" }
    ],
    table: "15"
  },
];

const tabs = ["All", "On Process", "Completed", "Cancelled"];

export default function Orders() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const summaryCards = [
    { label: t("total_orders"), value: "200", icon: ClipboardList },
    { label: t("on_process"), value: "45", icon: RefreshCw },
    { label: t("completed"), value: "140", icon: CheckCircle2 },
    { label: t("cancelled"), value: "15", icon: XCircle },
  ];

  const statusStyles: Record<string, string> = {
    "Completed": "bg-success text-success-foreground",
    "On Process": "bg-primary text-primary-foreground",
    "Cancelled": "bg-foreground text-card",
  };

  const typeDot: Record<string, string> = {
    "Dine-In": "bg-destructive",
    "Takeaway": "bg-warning",
    "Online": "bg-foreground",
    "Delivery": "bg-primary"
  };

  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [ordersList, setOrdersList] = useState(orders);
  const [overviewPeriod, setOverviewPeriod] = useState<"This Week" | "This Month" | "This Year">("This Week");
  const [orderTypesPeriod, setOrderTypesPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const [newOrder, setNewOrder] = useState({
    customer: "",
    type: "Dine-In" as "Dine-In" | "Takeaway" | "Delivery",
    table: "",
    address: "",
    items: [{ name: "", qty: 1, price: 0 }],
  });
  const itemsPerPage = 6;

  const filtered = activeTab === "All" ? ordersList : ordersList.filter((o) => o.status === activeTab);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filtered.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddOrder = () => {
    const totalAmount = newOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const newOrderData = {
      id: `ORD${1031 + ordersList.length}`,
      date: new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "long", day: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      customer: newOrder.customer,
      type: newOrder.type,
      address: newOrder.type === "Delivery" ? newOrder.address : "-",
      qty: newOrder.items.reduce((sum, item) => sum + item.qty, 0),
      amount: `$${totalAmount.toFixed(2)}`,
      status: "On Process" as const,
      items: newOrder.items.map(item => ({
        name: item.name,
        qty: item.qty,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
      })),
      table: newOrder.type === "Dine-In" ? newOrder.table : undefined,
    };
    setOrdersList([newOrderData, ...ordersList]);
    setShowAddModal(false);
    setNewOrder({
      customer: "",
      type: "Dine-In",
      table: "",
      address: "",
      items: [{ name: "", qty: 1, price: 0 }],
    });
  };

  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { name: "", qty: 1, price: 0 }],
    });
  };

  const removeOrderItem = (index: number) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((_, i) => i !== index),
    });
  };

  const updateOrderItem = (index: number, field: string, value: any) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const translatePeriod = (period: string) => {
    switch (period) {
      case "This Week": return t("this_week");
      case "This Month": return t("this_month");
      case "This Year": return t("this_year");
      default: return period;
    }
  };

  return (
    <>
      <DashboardLayout title={t("orders")} breadcrumb={t("customer_orders")}>
        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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

          <div className="col-span-1 sm:col-span-1 lg:col-span-2 rounded-xl bg-card p-5 shadow-sm">
            <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground">{t("orders_overview")}</h3>
              <select
                value={overviewPeriod}
                onChange={(e) => setOverviewPeriod(e.target.value as any)}
                className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="This Week">{t("this_week")}</option>
                <option value="This Month">{t("this_month")}</option>
                <option value="This Year">{t("this_year")}</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={overviewDataByPeriod[overviewPeriod]}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(20 10% 45%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(20 10% 45%)" }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(24, 95%, 53%)" fill="hsl(24, 95%, 53%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1 rounded-xl bg-card p-5 shadow-sm">
            <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground">{t("order_types")}</h3>
              <select
                value={orderTypesPeriod}
                onChange={(e) => setOrderTypesPeriod(e.target.value as any)}
                className="text-xs text-muted-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="This Week">{t("this_week")}</option>
                <option value="This Month">{t("this_month")}</option>
                <option value="This Year">{t("this_year")}</option>
              </select>
            </div>
            <div className="flex justify-center">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={typeDataByPeriod[orderTypesPeriod]} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                    {typeDataByPeriod[orderTypesPeriod].map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {typeDataByPeriod[orderTypesPeriod].map((typeItem) => (
                <div key={typeItem.name} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: typeItem.color }} />
                    {t(typeItem.nameKey)}
                  </span>
                  {typeItem.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs and View Toggle */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                  }`}
              >
                {tab === "All" ? t("all") : tab === "On Process" ? t("on_process") : tab === "Completed" ? t("completed") : t("cancelled")}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Plus className="h-4 w-4" />
              {t("add_order")}
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1 w-full sm:w-auto">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors flex-1 sm:flex-none justify-center ${viewMode === "table" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
                  }`}
              >
                <Table className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors flex-1 sm:flex-none justify-center ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
                  }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]
                        }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {order.status === "On Process" ? t("on_process") : order.status === "Completed" ? t("completed") : t("cancelled")}
                    </span>
                  </div>

                  {/* Customer */}
                  <h3 className="mb-1 text-lg font-bold text-foreground">{order.customer}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    #{order.id}
                  </p>

                  {/* Order Type */}
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${typeDot[order.type] || "bg-muted-foreground"}`} />
                      {order.type === "Dine-In" ? t("dine_in") : order.type === "Takeaway" ? t("takeaway") : t("delivery")}
                    </span>
                    {order.table && (
                      <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium">
                        {t("table")} {order.table}
                      </span>
                    )}
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold text-foreground">{t("items")}</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">x{item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{t("total")}</p>
                      <p className="text-xl font-bold text-primary">{order.amount}</p>
                      {order.type === "Delivery" && (
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${order.id === "ORD1029" ? "bg-primary" : "bg-muted-foreground"}`} />
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            {order.id === "ORD1029" ? "Jack Anderson" : t("assign_driver")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${order.id}`);
                        }}
                        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                      >
                        {t("details")}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {t("pay")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("showing")} {startIndex + 1}-{Math.min(endIndex, filtered.length)} {t("of")} {filtered.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`rounded px-2.5 py-1 ${currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Table View */
          <div className="rounded-xl bg-card p-5 shadow-sm overflow-x-auto">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">{t("order_id")}</th>
                    <th className="pb-3 font-medium">{t("date")}</th>
                    <th className="pb-3 font-medium">{t("customer")}</th>
                    <th className="pb-3 font-medium">{t("order_types")}</th>
                    <th className="pb-3 font-medium">{t("address")}</th>
                    <th className="pb-3 font-medium text-left">{t("qty")}</th>
                    <th className="pb-3 font-medium text-left">{t("amount")}</th>
                    <th className="pb-3 font-medium text-left">{t("status")}</th>
                    <th className="pb-3 font-medium text-left">{t("driver")}</th>
                    <th className="pb-3 font-medium text-left">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 text-muted-foreground">{o.id}</td>
                      <td className="py-3">
                        <p className="text-foreground">{o.date}</p>
                        <p className="text-xs text-muted-foreground">{o.time}</p>
                      </td>
                      <td className="py-3 text-foreground">{o.customer}</td>
                      <td className="py-3">
                        <span className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${typeDot[o.type] || "bg-muted-foreground"}`} />
                          {o.type === "Dine-In" ? t("dine_in") : o.type === "Takeaway" ? t("takeaway") : t("delivery")}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{o.address}</td>
                      <td className="py-3 text-muted-foreground">{o.qty}</td>
                      <td className="py-3 font-semibold text-primary">{o.amount}</td>
                      <td className="py-3">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                          {o.status === "On Process" ? t("on_process") : o.status === "Completed" ? t("completed") : t("cancelled")}
                        </span>
                      </td>
                      <td className="py-3">
                        {o.id === "ORD1029" ? (
                          <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-xs text-foreground">Jack A.</span>
                          </div>
                        ) : o.type === "Delivery" ? (
                          <button
                            onClick={() => navigate(`/orders/${o.id}`)}
                            className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-tight"
                          >
                            {t("unassigned")}
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => navigate(`/orders/${o.id}`)}
                          className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                          title={t("view")}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {currentOrders.map((o) => (
                <div key={o.id} className="rounded-lg border border-border p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{o.id}</p>
                      <p className="text-xs text-muted-foreground">{o.date}</p>
                    </div>
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                      {o.status === "On Process" ? t("on_process") : o.status === "Completed" ? t("completed") : t("cancelled")}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div><span className="text-muted-foreground">{t("customer")}:</span> <span className="text-foreground font-medium">{o.customer}</span></div>
                    <div><span className="text-muted-foreground">{t("order_types")}:</span> <span className="text-foreground">{o.type === "Dine-In" ? t("dine_in") : o.type === "Takeaway" ? t("takeaway") : t("delivery")}</span></div>
                    <div><span className="text-muted-foreground">{t("qty")}:</span> <span className="text-foreground">{o.qty}</span></div>
                    <div><span className="text-muted-foreground">{t("amount")}:</span> <span className="font-semibold text-primary">{o.amount}</span></div>
                  </div>
                  <button
                    onClick={() => navigate(`/orders/${o.id}`)}
                    className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {t("view_details")}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("showing")} {startIndex + 1}-{Math.min(endIndex, filtered.length)} {t("of")} {filtered.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`rounded px-2.5 py-1 ${currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded px-2 py-1 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Order Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card p-4 sm:p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{t("add_new_order")}</h3>
                <button onClick={() => setShowAddModal(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">{t("customer_name")}</label>
                    <input
                      type="text"
                      value={newOrder.customer}
                      onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                      placeholder={t("enter_customer_name")}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">{t("order_types")}</label>
                    <select
                      value={newOrder.type}
                      onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value as any })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                    >
                      <option value="Dine-In">{t("dine_in")}</option>
                      <option value="Takeaway">{t("takeaway")}</option>
                      <option value="Delivery">{t("delivery")}</option>
                    </select>
                  </div>
                </div>

                {newOrder.type === "Dine-In" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">{t("table_number")}</label>
                    <input
                      type="text"
                      value={newOrder.table}
                      onChange={(e) => setNewOrder({ ...newOrder, table: e.target.value })}
                      placeholder={t("enter_table_number")}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                )}

                {newOrder.type === "Delivery" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">{t("delivery_address")}</label>
                    <input
                      type="text"
                      value={newOrder.address}
                      onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                      placeholder={t("enter_delivery_address")}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                )}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">{t("items")}</label>
                    <button
                      onClick={addOrderItem}
                      className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium hover:bg-accent/80 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      {t("add_item")}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newOrder.items.map((item, index) => (
                      <div key={index} className="flex flex-wrap sm:flex-nowrap items-end gap-3 rounded-lg border border-border p-3">
                        <div className="flex-1 w-full sm:w-auto min-w-[150px]">
                          <label className="mb-1 block text-xs font-medium text-foreground">{t("item_name")}</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateOrderItem(index, "name", e.target.value)}
                            placeholder={t("item_name")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div className="w-full sm:w-20">
                          <label className="mb-1 block text-xs font-medium text-foreground">{t("qty")}</label>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updateOrderItem(index, "qty", parseInt(e.target.value))}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div className="w-full sm:w-24">
                          <label className="mb-1 block text-xs font-medium text-foreground">{t("price")}</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateOrderItem(index, "price", parseFloat(e.target.value))}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        {newOrder.items.length > 1 && (
                          <button
                            onClick={() => removeOrderItem(index)}
                            className="rounded-lg border border-destructive p-2 text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-accent/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{t("total_amount")}:</span>
                    <span className="text-xl font-bold text-primary">
                      ${newOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={handleAddOrder}
                    disabled={!newOrder.customer || newOrder.items.some(item => !item.name || item.price <= 0)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("add_order")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
