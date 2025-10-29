"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBook, IconShoppingBag, IconUsers, IconChartBar, IconLogout, IconHome, IconMenu2, IconX, IconArrowLeft, IconCategory, IconUserCircle, IconBuildingStore } from "@tabler/icons-react";
import { useStore } from "@/store/useStore";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useStore();

  const menuItems = [
    { icon: IconHome, label: "Dashboard", href: "/admin" },
    { icon: IconBook, label: "Quản lý sách", href: "/admin/books" },
    { icon: IconCategory, label: "Danh mục", href: "/admin/categories" },
    { icon: IconUserCircle, label: "Tác giả", href: "/admin/authors" },
    { icon: IconBuildingStore, label: "Nhà xuất bản", href: "/admin/publishers" },
    { icon: IconShoppingBag, label: "Đơn hàng", href: "/admin/orders" },
    { icon: IconUsers, label: "Khách hàng", href: "/admin/customers" },
    { icon: IconChartBar, label: "Thống kê", href: "/admin/analytics" },
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-6 left-6 z-50 p-3 glass-card rounded-xl shadow-lg"
      >
        {collapsed ? <IconMenu2 size={24} /> : <IconX size={24} />}
      </motion.button>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: collapsed ? -300 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-72 glass-card border-r border-white/20 p-6 z-40"
      >
      <Link href="/">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <IconBook size={24} className="text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent block">BookStore</span>
            <span className="text-xs text-gray-500">Admin Panel</span>
          </div>
        </div>
      </Link>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <motion.div whileHover={{ x: 4 }} className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${isActive ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-gray-700 hover:bg-white/50"}`}>
                <item.icon size={24} />
                <span className="font-semibold text-lg">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        <Link href="/">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all">
            <IconArrowLeft size={24} />
            <span className="font-semibold text-lg">Về trang chủ</span>
          </motion.button>
        </Link>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={logout} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
          <IconLogout size={24} />
          <span className="font-semibold text-lg">Đăng xuất</span>
        </motion.button>
      </div>
    </motion.aside>
    </>
  );
}
