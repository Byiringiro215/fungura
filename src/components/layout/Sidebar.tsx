import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  CalendarDays,
  UtensilsCrossed,
  Package,
  Star,
  ChevronDown,
  ChefHat,
  Users,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const navItems = [
  { label: "dashboard", icon: LayoutDashboard, path: "/" },
  { label: "orders", icon: ClipboardList, path: "/orders" },
  { label: "kitchen", icon: ChefHat, path: "/kitchen" },
  { label: "messages", icon: MessageSquare, path: "/messages", badge: 5 },
  { label: "calendar", icon: CalendarDays, path: "/calendar" },
  { label: "staff", icon: Users, path: "/workers" },
  { label: "menu", icon: UtensilsCrossed, path: "/menu" },
];

const inventorySubItems = [
  { label: "inventory", path: "/inventory" },
  { label: "purchase_order", path: "/purchase-order" },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [inventoryOpen, setInventoryOpen] = useState(
    location.pathname === "/inventory" || location.pathname === "/purchase-order"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isInventoryActive = location.pathname === "/inventory" || location.pathname === "/purchase-order";

  return (
    <>
      {/* Mobile menu button - visible only on mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-30 flex h-screen w-full sm:w-[220px] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">Fungura</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                    ? "bg-sidebar-accent text-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {t(item.label)}
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 space-y-0.5">
          {/* Inventory with submenu */}
          <button
            onClick={() => setInventoryOpen(!inventoryOpen)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isInventoryActive
              ? "bg-sidebar-accent text-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
          >
            <Package className="h-[18px] w-[18px]" />
            {t('inventory')}
            <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${inventoryOpen ? "rotate-180" : ""}`} />
          </button>
          {inventoryOpen && (
            <div className="ml-9 space-y-0.5">
              {inventorySubItems.map((sub) => (
                <Link
                  key={sub.label}
                  to={sub.path}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname === sub.path
                    ? "font-semibold text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                >
                  {t(sub.label)}
                </Link>
              ))}
            </div>
          )}

          {/* Reviews */}
          <Link
            to="/reviews"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${location.pathname === "/reviews"
              ? "bg-sidebar-accent text-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
          >
            <Star className="h-[18px] w-[18px]" />
            {t('reviews')}
          </Link>
        </div>
      </nav>

      {/* Bottom CTA - Upgrade Card */}
      <div className="m-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-4">
        <div className="mb-3 flex justify-center">
          <div className="text-4xl">🍜</div>
        </div>
        <p className="mb-3 text-center text-xs font-medium text-gray-800 leading-relaxed">
          {t('upgrade_msg')}
        </p>
        <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg">
          {t('upgrade_now')}
        </button>
      </div>
    </aside>
    </>
  );
}
