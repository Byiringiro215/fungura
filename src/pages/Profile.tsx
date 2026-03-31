import DashboardLayout from "@/components/layout/DashboardLayout";
import { Camera, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <DashboardLayout title={t("profile")} breadcrumb={t("profile")}>
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full bg-primary/20 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground">Orlando Laurentius</h2>
              <p className="text-sm text-muted-foreground">{t("manager")}</p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {t("restaurant_manager")}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-foreground">{t("contact_info")}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Mail className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("email")}</p>
                  <p className="text-sm font-medium text-foreground">orlando@fungura.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Phone className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("phone")}</p>
                  <p className="text-sm font-medium text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <MapPin className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("location")}</p>
                  <p className="text-sm font-medium text-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{t("personal_info")}</h3>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {t("edit_profile")}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("first_name")}
                </label>
                <input
                  type="text"
                  value="Orlando"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("last_name")}
                </label>
                <input
                  type="text"
                  value="Laurentius"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("email_address")}
                </label>
                <input
                  type="email"
                  value="orlando@fungura.com"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("phone_number")}
                </label>
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("address")}
                </label>
                <input
                  type="text"
                  value="123 Market Street, San Francisco, CA 94103"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-foreground">{t("work_info")}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("position")}
                </label>
                <input
                  type="text"
                  value={t("restaurant_manager")}
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("department")}
                </label>
                <input
                  type="text"
                  value={t("management")}
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("employee_id")}
                </label>
                <input
                  type="text"
                  value="EMP-2024-001"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  {t("join_date")}
                </label>
                <input
                  type="text"
                  value="January 15, 2024"
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1,234</p>
                  <p className="text-xs text-muted-foreground">{t("orders_managed")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">365</p>
                  <p className="text-xs text-muted-foreground">{t("days_active")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <Mail className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">89</p>
                  <p className="text-xs text-muted-foreground">{t("messages_sent")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
