import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  CalendarDays,
  UtensilsCrossed,
  Package,
  Star,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Orders", icon: ClipboardList, path: "/orders" },
  { label: "Messages", icon: MessageSquare, path: "/messages", badge: 5 },
  { label: "Calendar", icon: CalendarDays, path: "/calendar" },
  { label: "Menu", icon: UtensilsCrossed, path: "/menu" },
];

const secondaryItems = [
  { label: "Inventory", icon: Package, path: "/inventory", hasSubmenu: true },
  { label: "Reviews", icon: Star, path: "/reviews" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[220px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">Reztro</span>
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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
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
          {secondaryItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
                {item.hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom CTA */}
      <div className="p-4">
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
          Streamline restaurant management with real-time insights.
        </p>
        <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
