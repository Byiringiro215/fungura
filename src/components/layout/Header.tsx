import { Search, Bell, Settings } from "lucide-react";

interface HeaderProps {
  title: string;
  breadcrumb?: string;
  subtitle?: string;
}

export default function Header({ title, breadcrumb, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        {breadcrumb && (
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">Dashboard</span>
            {" / "}
            {breadcrumb}
          </p>
        )}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search anything"
            className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button className="relative rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent">
          <Settings className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 pl-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Orlando Laurentius</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/20" />
        </div>
      </div>
    </header>
  );
}
