"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 p-8 transition-all duration-300 ${collapsed ? "ml-0" : "ml-72"}`}>{children}</main>
    </div>
  );
}
