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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-[220px] flex flex-1 flex-col">
        <Header title={title} breadcrumb={breadcrumb} subtitle={subtitle} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
