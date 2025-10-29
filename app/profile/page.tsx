"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUser, IconShoppingBag, IconHeart, IconSettings, IconChevronRight, IconTrendingUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useStore } from "@/store/useStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useStore();
  const [stats, setStats] = useState({ total: 0, shipping: 0, delivered: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    if (!user?._id && !user?.id) {
      setLoading(false);
      return;
    }
    try {
      const userId = user._id || user.id;
      const res = await fetch(`/api/orders/my?userId=${userId}`);
      const data = await res.json();
      const orders = data.orders || [];
      
      setStats({
        total: orders.length,
        shipping: orders.filter((o: any) => o.status === "shipping" || o.status === "processing").length,
        delivered: orders.filter((o: any) => o.status === "delivered").length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: IconUser, title: "Thông tin cá nhân", desc: "Quản lý thông tin tài khoản của bạn", href: "/profile/info", color: "from-blue-500 to-cyan-500" },
    { icon: IconShoppingBag, title: "Đơn hàng", desc: "Xem và theo dõi đơn hàng của bạn", href: "/profile/orders", color: "from-green-500 to-emerald-500" },
    { icon: IconHeart, title: "Yêu thích", desc: "Danh sách sách yêu thích của bạn", href: "/profile/wishlist", color: "from-pink-500 to-rose-500" },
    { icon: IconSettings, title: "Cài đặt", desc: "Cài đặt tài khoản và bảo mật", href: "/profile/settings", color: "from-purple-500 to-indigo-500" },
  ];

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4"
            >
              <IconUser size={20} className="text-blue-600" />
              <span className="text-sm md:text-base font-semibold text-gray-800">Khu vực cá nhân</span>
            </motion.div>
            <h1 className="text-3xl md:text-6xl font-bold mb-4">
              <span className="text-gray-900">Xin chào, </span>
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="gradient-primary bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                {user?.name?.split(" ").slice(-2).join(" ") || "Bạn"}!
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-gray-600"
            >
              Quản lý thông tin và theo dõi hoạt động
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 md:p-6 rounded-2xl mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-xl flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 truncate">{user?.name || "Người dùng"}</h2>
                <p className="text-sm md:text-base text-gray-600 truncate">{user?.email || "email@example.com"}</p>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.push("/profile/info")} className="px-4 md:px-6 py-2 md:py-3 glass-btn rounded-xl font-semibold text-sm md:text-base">
                Sửa
              </motion.button>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-4 md:p-6 rounded-2xl animate-pulse">
                  <div className="h-20 md:h-24 bg-gray-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
              {[
                { label: "Tổng đơn", value: stats.total, color: "from-blue-500 to-cyan-500", icon: IconShoppingBag },
                { label: "Đang giao", value: stats.shipping, color: "from-orange-500 to-red-500", icon: IconTrendingUp },
                { label: "Hoàn thành", value: stats.delivered, color: "from-green-500 to-emerald-500", icon: IconShoppingBag },
              ].map((stat, i) => (
                <motion.div key={i} whileTap={{ scale: 0.95 }} className="glass-card p-3 md:p-6 rounded-2xl text-center">
                  <div className={`w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon size={20} className="md:w-7 md:h-7 text-white" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs md:text-base font-semibold text-gray-700">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {menuItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(item.href)}
                className="glass-card p-4 md:p-6 rounded-2xl cursor-pointer group active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <item.icon size={24} className="md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-1">{item.desc}</p>
                  </div>
                  <IconChevronRight size={20} className="text-gray-400 group-active:text-purple-600 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
