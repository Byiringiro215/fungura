import { Search, Bell, Settings, User, LogOut, Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  title: string;
  breadcrumb?: string;
  subtitle?: string;
}

export default function Header({ title, breadcrumb, subtitle }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/auth");
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border bg-card px-3 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
      <div className="min-w-0">
        <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">{title}</h1>
        {breadcrumb && (
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">Dashboard</span>
            {" / "}
            {breadcrumb}
          </p>
        )}
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            placeholder="Search"
            className="w-32 sm:w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={() => navigate("/notifications")}
          className="relative rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent uppercase text-xs font-bold"
          >
            <Globe className="h-4 w-4" />
            {i18n.language.split('-')[0]}
          </button>
          {isLangOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 sm:w-40 rounded-lg border border-border bg-card shadow-lg z-50 p-1">
              {[
                { code: 'en', label: 'English' },
                { code: 'rw', label: 'Kinyarwanda' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  {lang.label}
                  {i18n.language.startsWith(lang.code) && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">Orlando Laurentius</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 rounded-lg border border-border bg-card shadow-lg z-50">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Orlando Laurentius</p>
                <p className="text-xs text-muted-foreground">orlando@fungura.com</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>
              <div className="border-t border-border p-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
