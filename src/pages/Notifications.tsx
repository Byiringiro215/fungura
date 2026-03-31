import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bell, Package, MessageSquare, AlertCircle, CheckCircle, Clock, Trash2, ChevronDown, Megaphone, Send, Users, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    icon: Package,
    title: "New Order Received",
    message: "Order #ORD1028 has been placed by Hannah Gold",
    time: "2 minutes ago",
    read: false,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    type: "message",
    icon: MessageSquare,
    title: "New Message",
    message: "You have a new message from Frank Miller",
    time: "15 minutes ago",
    read: false,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 3,
    type: "alert",
    icon: AlertCircle,
    title: "Low Stock Alert",
    message: "Olive Oil stock is running low. Only 10 units remaining",
    time: "1 hour ago",
    read: false,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: 4,
    type: "success",
    icon: CheckCircle,
    title: "Order Completed",
    message: "Order #ORD1027 has been successfully delivered",
    time: "2 hours ago",
    read: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 5,
    type: "order",
    icon: Package,
    title: "Order Update",
    message: "Order #ORD1026 is now being prepared",
    time: "3 hours ago",
    read: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 6,
    type: "alert",
    icon: Clock,
    title: "Delivery Delayed",
    message: "Order #ORD1025 delivery is delayed by 15 minutes",
    time: "4 hours ago",
    read: true,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: 7,
    type: "message",
    icon: MessageSquare,
    title: "New Review",
    message: "Alice Johnson left a 5-star review for your restaurant",
    time: "5 hours ago",
    read: true,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 8,
    type: "success",
    icon: CheckCircle,
    title: "Payment Received",
    message: "Payment of $36.00 received for Order #ORD1024",
    time: "6 hours ago",
    read: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 9,
    type: "order",
    icon: Package,
    title: "New Order Received",
    message: "Order #ORD1023 has been placed by David Chen",
    time: "7 hours ago",
    read: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 10,
    type: "alert",
    icon: AlertCircle,
    title: "Low Stock Alert",
    message: "Tomato Sauce stock is running low. Only 8 units remaining",
    time: "8 hours ago",
    read: true,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: 11,
    type: "success",
    icon: CheckCircle,
    title: "Order Completed",
    message: "Order #ORD1022 has been successfully delivered",
    time: "9 hours ago",
    read: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 12,
    type: "message",
    icon: MessageSquare,
    title: "New Message",
    message: "You have a new message from Emma Wilson",
    time: "10 hours ago",
    read: true,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 13,
    type: "order",
    icon: Package,
    title: "Order Update",
    message: "Order #ORD1021 is now ready for pickup",
    time: "11 hours ago",
    read: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 14,
    type: "success",
    icon: CheckCircle,
    title: "Payment Received",
    message: "Payment of $52.00 received for Order #ORD1020",
    time: "12 hours ago",
    read: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 15,
    type: "alert",
    icon: Clock,
    title: "Delivery Delayed",
    message: "Order #ORD1019 delivery is delayed by 20 minutes",
    time: "13 hours ago",
    read: true,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export default function Notifications() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    message: "",
    type: "promotion",
    target: "all"
  });
  const itemsPerPage = 10;
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get unique types
  const types = ["all", ...Array.from(new Set(initialNotifications.map(n => n.type)))];

  const filteredNotifications = notificationList.filter((n) => {
    const matchesReadStatus = filter === "all" || !n.read;
    const matchesType = typeFilter === "all" || n.type === typeFilter;
    return matchesReadStatus && matchesType;
  });

  const unreadCount = notificationList.filter((n) => !n.read).length;

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const markAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })));
    setCurrentPage(1);
  };

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter((n) => n.id !== id));
  };

  const handleFilterChange = (newFilter: "all" | "unread") => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1);
    setShowTypeDropdown(false);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);

      // Add to local list for feedback
      const newNotif = {
        id: Date.now(),
        type: broadcastForm.type,
        icon: broadcastForm.type === 'promotion' ? Megaphone : (broadcastForm.type === 'discount' ? Package : AlertCircle),
        title: broadcastForm.title,
        message: broadcastForm.message,
        time: "Just now",
        read: true,
        color: broadcastForm.type === 'promotion' ? "text-purple-500" : "text-primary",
        bgColor: broadcastForm.type === 'promotion' ? "bg-purple-500/10" : "bg-primary/10",
      };

      setNotificationList([newNotif, ...notificationList]);

      setTimeout(() => {
        setSendSuccess(false);
        setShowBroadcastModal(false);
        setBroadcastForm({ title: "", message: "", type: "promotion", target: "all" });
      }, 2000);
    }, 1500);
  };

  return (
    <DashboardLayout title={t("notifications")} breadcrumb={t("notifications")}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-accent"
                }`}
            >
              {t("all")}
            </button>
            <button
              onClick={() => handleFilterChange("unread")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === "unread"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-accent"
                }`}
            >
              {t("unread")} ({unreadCount})
            </button>
          </div>

          {/* Type Filter */}
          <div className="relative" ref={typeDropdownRef}>
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
            >
              {typeFilter === "all" ? t("all_types") : t(typeFilter)}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-10">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-accent transition-colors capitalize ${typeFilter === type ? "bg-accent font-medium" : ""
                      }`}
                  >
                    {type === "all" ? t("all_types") : t(type)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("mark_all_read")}
        </button>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="ml-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95"
        >
          <Megaphone className="h-4 w-4" />
          {t("send_broadcast")}
        </button>
      </div>

      {/* Notifications Table */}
      {filteredNotifications.length === 0 ? (
        <div className="rounded-xl bg-card p-12 text-center shadow-sm">
          <Bell className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {t("no_notifications")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("caught_up")}
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("type")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("title")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("message")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("time")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentNotifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className={`hover:bg-accent/50 transition-colors ${!notification.read ? "bg-primary/5" : ""
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!notification.read ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {t("unread")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {t("read")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${notification.bgColor}`}
                        >
                          <notification.icon className={`h-4 w-4 ${notification.color}`} />
                        </div>
                        <span className="text-sm font-medium text-foreground capitalize">
                          {t(notification.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"
                        }`}>
                        {notification.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {notification.message}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {t("mark_read")}
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                          title={t("delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
            <span>
              {t("showing")} {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} {t("of")} {filteredNotifications.length}
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
      )
      }
      {/* Broadcast Notification Modal */}
      {
        showBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              {sendSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success animate-bounce">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("notification_sent")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("broadcast_success", { target: t(broadcastForm.target) })}</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Megaphone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{t("new_broadcast")}</h3>
                        <p className="text-xs text-muted-foreground">{t("send_everyone")}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowBroadcastModal(false)} className="rounded-full p-2 hover:bg-accent transition-colors">
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>

                  <form onSubmit={handleSendBroadcast} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t("notification_title")}</label>
                      <input
                        required
                        placeholder="e.g. Special Weekend Offer!"
                        value={broadcastForm.title}
                        onChange={e => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t("message_content")}</label>
                      <textarea
                        required
                        placeholder="Enter the message you want users to see..."
                        rows={4}
                        value={broadcastForm.message}
                        onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">{t("category")}</label>
                        <select
                          value={broadcastForm.type}
                          onChange={e => setBroadcastForm({ ...broadcastForm, type: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-4"
                        >
                          <option value="promotion">{t("promotion")}</option>
                          <option value="discount">{t("discount")}</option>
                          <option value="system">{t("system_alert")}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">{t("target_audience")}</label>
                        <select
                          value={broadcastForm.target}
                          onChange={e => setBroadcastForm({ ...broadcastForm, target: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-4"
                        >
                          <option value="all">{t("all_users")}</option>
                          <option value="customers">{t("customers_only")}</option>
                          <option value="drivers">{t("drivers_only")}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          {t("processing")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t("launch_notification")}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )
      }
    </DashboardLayout >
  );
}
