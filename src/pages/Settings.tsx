import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bell, Lock, Globe, Palette, Shield, Database } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [activeTab, setActiveTab] = useState("Notifications");

  const sidebarItems = [
    { id: "Notifications", icon: Bell, label: t("notifications") },
    { id: "Security", icon: Lock, label: t("security") },
    { id: "Language", icon: Globe, label: t("lang_region") },
    { id: "Appearance", icon: Palette, label: t("appearance") },
    { id: "Privacy", icon: Shield, label: t("privacy") },
    { id: "Data", icon: Database, label: t("data_management") },
  ];

  return (
    <DashboardLayout title={t("settings")} breadcrumb={t("settings")}>
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 space-y-6">
          {/* Notifications Section */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-foreground">{t("notif_preferences")}</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("email_notifications")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("email_notif_desc")}
                  </p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifications ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${emailNotifications ? "left-5" : "left-0.5"
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("push_notifications")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("push_notif_desc")}
                  </p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${pushNotifications ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${pushNotifications ? "left-5" : "left-0.5"
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("order_updates")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("order_updates_desc")}
                  </p>
                </div>
                <button
                  onClick={() => setOrderUpdates(!orderUpdates)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${orderUpdates ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${orderUpdates ? "left-5" : "left-0.5"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-foreground">{t("security_settings")}</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("two_factor_auth")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("two_factor_desc")}
                  </p>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${twoFactor ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${twoFactor ? "left-5" : "left-0.5"
                      }`}
                  />
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("current_password")}
                </label>
                <input
                  type="password"
                  placeholder={t("current_pwd_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("new_password")}
                </label>
                <input
                  type="password"
                  placeholder={t("new_pwd_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("confirm_new_password")}
                </label>
                <input
                  type="password"
                  placeholder={t("confirm_pwd_placeholder")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {t("update_password")}
              </button>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-foreground">{t("appearance")}</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  {t("theme")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "Light", label: t("light") },
                    { id: "Dark", label: t("dark") },
                    { id: "System", label: t("system") },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${theme.id === "Light"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              {t("cancel")}
            </button>
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              {t("save_changes")}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
