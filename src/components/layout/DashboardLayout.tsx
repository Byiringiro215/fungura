import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, breadcrumb, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 pt-[72px] md:ml-[220px]">
        <Header title={title} breadcrumb={breadcrumb} subtitle={subtitle} />
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
