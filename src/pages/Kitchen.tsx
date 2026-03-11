import DashboardLayout from "@/components/layout/DashboardLayout";
import { Clock, ChefHat, CheckCircle, AlertCircle, LayoutGrid, Table } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Order {
  id: string;
  customer: string;
  table?: string;
  type: "Dine-In" | "Takeaway" | "Delivery";
  items: { name: string; qty: number; notes?: string }[];
  time: string;
  status: "pending" | "preparing" | "ready" | "completed";
  priority: "normal" | "urgent";
  driver?: {
    name: string;
    type: string;
    image: string;
  };
}

const availableDrivers = [
  { id: 1, name: "Jack Anderson", type: "Business Driver", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100" },
  { id: 2, name: "Alex Johnson", type: "Business Driver", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
  { id: 3, name: "Mike Tyson", type: "Independent Driver", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
];

const initialOrders: Order[] = [
  {
    id: "ORD1028",
    customer: "Frank Miller",
    type: "Delivery",
    items: [
      { name: "Smokey Supreme Pizza", qty: 1, notes: "Extra cheese" },
      { name: "Garlic Bread", qty: 1, notes: "Lightly toasted" },
      { name: "Caesar Salad", qty: 2, notes: "Dressing on the side" },
      { name: "Chocolate Lava Cake", qty: 1, notes: "Extra chocolate drizzle" },
    ],
    time: "5 mins ago",
    status: "pending",
    priority: "urgent",
  },
  {
    id: "ORD1029",
    customer: "Alice Johnson",
    table: "12",
    type: "Dine-In",
    items: [
      { name: "Grilled Salmon", qty: 2 },
      { name: "Mashed Potatoes", qty: 2 },
      { name: "Steamed Vegetables", qty: 2 },
    ],
    time: "8 mins ago",
    status: "preparing",
    priority: "normal",
  },
  {
    id: "ORD1030",
    customer: "Bob Smith",
    type: "Takeaway",
    items: [
      { name: "Chicken Burger", qty: 3 },
      { name: "French Fries", qty: 3 },
      { name: "Coke", qty: 3 },
    ],
    time: "12 mins ago",
    status: "preparing",
    priority: "normal",
  },
  {
    id: "ORD1031",
    customer: "Dana White",
    table: "8",
    type: "Dine-In",
    items: [
      { name: "Spaghetti Carbonara", qty: 1 },
      { name: "Garlic Bread", qty: 1 },
    ],
    time: "15 mins ago",
    status: "ready",
    priority: "normal",
  },
  {
    id: "ORD1032",
    customer: "Eve Carter",
    type: "Delivery",
    items: [
      { name: "Margherita Pizza", qty: 2 },
      { name: "Caesar Salad", qty: 1 },
      { name: "Tiramisu", qty: 2 },
    ],
    time: "3 mins ago",
    status: "pending",
    priority: "urgent",
  },
  {
    id: "ORD1033",
    customer: "Grace Lee",
    table: "5",
    type: "Dine-In",
    items: [
      { name: "Beef Steak", qty: 1, notes: "Medium rare" },
      { name: "Grilled Vegetables", qty: 1 },
    ],
    time: "18 mins ago",
    status: "ready",
    priority: "normal",
  },
];

export default function Kitchen() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<"all" | "pending" | "preparing" | "ready">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDriverModal, setShowDriverModal] = useState<{ orderId: string } | null>(null);
  const itemsPerPage = 10;

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const assignDriver = (orderId: string, driver: typeof availableDrivers[0]) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, driver: { name: driver.name, type: driver.type, image: driver.image } } : order
    ));
    setShowDriverModal(null);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning";
      case "preparing":
        return "bg-primary/20 text-primary border-primary";
      case "ready":
        return "bg-success/20 text-success border-success";
      case "completed":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    switch (currentStatus) {
      case "pending":
        return "preparing";
      case "preparing":
        return "ready";
      case "ready":
        return "completed";
      default:
        return null;
    }
  };

  const getStatusButtonText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return t("start_preparing");
      case "preparing":
        return t("mark_ready");
      case "ready":
        return t("complete_order");
      default:
        return "";
    }
  };

  return (
    <DashboardLayout title={t("kitchen")} breadcrumb={t("kitchen_orders")}>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">{t("pending_orders")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{preparingCount}</p>
              <p className="text-xs text-muted-foreground">{t("preparing")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{readyCount}</p>
              <p className="text-xs text-muted-foreground">{t("ready_to_serve")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {orders.filter((o) => o.priority === "urgent").length}
              </p>
              <p className="text-xs text-muted-foreground">{t("urgent_orders")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: t("all"), value: "all" as const },
            { label: t("pending"), value: "pending" as const },
            { label: t("preparing"), value: "preparing" as const },
            { label: t("ready"), value: "ready" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleFilterChange(tab.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-accent"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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

      {/* Orders Grid/Table */}
      {viewMode === "table" ? (
        <div className="rounded-xl bg-card shadow-sm overflow-x-auto">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-4 font-medium">{t("id")}</th>
                <th className="px-6 py-4 font-medium">{t("customer")}</th>
                <th className="px-6 py-4 font-medium">{t("type")}</th>
                <th className="px-6 py-4 font-medium">{t("items")}</th>
                <th className="px-6 py-4 font-medium">{t("time")}</th>
                <th className="px-6 py-4 font-medium">{t("status")}</th>
                <th className="px-6 py-4 font-medium">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-b border-border last:border-0 hover:bg-accent/30 transition-colors ${order.priority === "urgent" ? "bg-destructive/5" : ""
                    }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{order.id}</span>
                      {order.priority === "urgent" && (
                        <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                          {t("urgent")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{order.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{t(order.type.toLowerCase())}</span>
                        {order.table && (
                          <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium">
                            {t("table")} {order.table}
                          </span>
                        )}
                      </div>
                      {order.type === "Delivery" && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {order.driver ? (
                            <>
                              <img src={order.driver.image} className="h-5 w-5 rounded-full object-cover" />
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                {order.driver.name}
                              </span>
                            </>
                          ) : (
                            <button
                              onClick={() => setShowDriverModal({ orderId: order.id })}
                              className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter"
                            >
                              {t("assign_driver")}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-medium text-foreground">
                            {item.qty}x {item.name}
                          </span>
                          {item.notes && (
                            <span className="ml-2 text-muted-foreground italic">({item.notes})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full border-2 px-3 py-1 text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "pending" ? t("pending") : order.status === "preparing" ? t("preparing") : order.status === "ready" ? t("ready") : t("completed")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status !== "completed" && (
                      <button
                        onClick={() => {
                          const nextStatus = getNextStatus(order.status);
                          if (nextStatus) {
                            updateOrderStatus(order.id, nextStatus);
                          }
                        }}
                        className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${order.status === "pending"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : order.status === "preparing"
                            ? "bg-success text-success-foreground hover:bg-success/90"
                            : "bg-foreground text-background hover:bg-foreground/90"
                          }`}
                      >
                        {getStatusButtonText(order.status)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3 p-5">
              {currentOrders.map((order) => (
                <div key={order.id} className={`rounded-lg border-2 p-3 space-y-2 ${order.priority === "urgent" ? "border-destructive bg-destructive/5" : "border-border"}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`inline-block rounded-full border-2 px-2 py-0.5 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status === "pending" ? t("pending") : order.status === "preparing" ? t("preparing") : order.status === "ready" ? t("ready") : t("completed")}
                      </span>
                      {order.priority === "urgent" && (
                        <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                          {t("urgent")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div><span className="text-muted-foreground">{t("type")}:</span> <span className="text-foreground">{t(order.type.toLowerCase())}</span></div>
                    <div><span className="text-muted-foreground">{t("time")}:</span> <span className="text-foreground">{order.time}</span></div>
                    <div className="pt-1">
                      <p className="text-muted-foreground mb-1">{t("items")}:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-foreground ml-2">
                          {item.qty}x {item.name} {item.notes && <span className="text-muted-foreground italic">({item.notes})</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  {order.status !== "completed" && (
                    <button
                      onClick={() => {
                        const nextStatus = getNextStatus(order.status);
                        if (nextStatus) {
                          updateOrderStatus(order.id, nextStatus);
                        }
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-xs font-medium transition-colors ${order.status === "pending"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : order.status === "preparing"
                          ? "bg-success text-success-foreground hover:bg-success/90"
                          : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                    >
                      {getStatusButtonText(order.status)}
                    </button>
                  )}
                </div>
              ))}
            </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-6 py-4 text-xs text-muted-foreground">
            <span>
              {t("showing")} {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} {t("of")} {filteredOrders.length}
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
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className={`rounded-xl bg-card p-5 shadow-sm border-2 ${order.priority === "urgent" ? "border-destructive" : "border-transparent"
                  }`}
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t(order.type.toLowerCase())}</span>
                      {order.table && (
                        <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium">
                          {t("table")} {order.table}
                        </span>
                      )}
                      {order.priority === "urgent" && (
                        <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                          {t("urgent")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full border-2 px-3 py-1 text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "pending" ? t("pending") : order.status === "preparing" ? t("preparing") : order.status === "ready" ? t("ready") : t("completed")}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>

                {/* Driver Info Quick Bar */}
                {order.type === "Delivery" && (
                  <div className="mb-4 flex items-center justify-between rounded-lg bg-accent/30 p-2 border border-border/50">
                    <div className="flex items-center gap-2">
                      {order.driver ? (
                        <>
                          <img src={order.driver.image} className="h-8 w-8 rounded-full object-cover border-2 border-primary" />
                          <div>
                            <p className="text-[10px] font-bold text-foreground leading-tight">{order.driver.name}</p>
                            <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">{order.driver.type}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground leading-tight">{t("no_driver")}</p>
                            <span className="text-[8px] text-primary font-bold uppercase tracking-widest">{t("unassigned")}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setShowDriverModal({ orderId: order.id })}
                      className="rounded bg-background px-2 py-1 text-[10px] font-bold text-primary border border-primary/20 hover:bg-primary/5 transition-colors uppercase"
                    >
                      {order.driver ? t("change") : t("assign")}
                    </button>
                  </div>
                )}

                {/* Items */}
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">{t("items")}:</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {item.qty}x {item.name}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground italic">{t("note")} {item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {order.status !== "completed" && (
                  <button
                    onClick={() => {
                      const nextStatus = getNextStatus(order.status);
                      if (nextStatus) {
                        updateOrderStatus(order.id, nextStatus);
                      }
                    }}
                    className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${order.status === "pending"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : order.status === "preparing"
                        ? "bg-success text-success-foreground hover:bg-success/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                  >
                    {getStatusButtonText(order.status)}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {t("showing")} {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} {t("of")} {filteredOrders.length}
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
      )}

      {filteredOrders.length === 0 && (
        <div className="rounded-xl bg-card p-12 text-center shadow-sm">
          <ChefHat className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">{t("no_orders")}</h3>
          <p className="text-sm text-muted-foreground">
            {filter !== "all"
              ? t("no_status_orders", { status: t(filter) })
              : t("no_orders_msg")}
          </p>
        </div>
      )}
      {/* Driver Assignment Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDriverModal(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-card p-4 sm:p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">{t("assign_delivery_partner")}</h2>
            <div className="space-y-3">
              {availableDrivers.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() => assignDriver(showDriverModal.orderId, driver)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent group"
                >
                  <img src={driver.image} className="h-10 w-10 rounded-full object-cover" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-foreground">{driver.name}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{driver.type}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowDriverModal(null)}
              className="mt-6 w-full rounded-xl border border-border py-2.5 text-sm font-bold text-foreground hover:bg-accent transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
