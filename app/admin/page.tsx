"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconBook, IconShoppingBag, IconUsers, IconCoin, IconTrendingUp, IconChevronRight, IconChartBar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const statsData = [
    { icon: IconBook, label: "Tổng sách", value: stats.totalBooks, color: "from-blue-500 to-cyan-500" },
    { icon: IconShoppingBag, label: "Đơn hàng", value: stats.totalOrders, color: "from-green-500 to-emerald-500" },
    { icon: IconUsers, label: "Khách hàng", value: stats.totalCustomers, color: "from-purple-500 to-pink-500" },
    { icon: IconCoin, label: "Doanh thu", value: `${(stats.totalRevenue / 1000000).toFixed(1)}M`, color: "from-orange-500 to-red-500" },
  ];

  const lineChartData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)",
        data: stats.revenueByMonth,
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const categoryLabels = Object.keys(stats.categorySales);
  const categoryValues = Object.values(stats.categorySales);
  const barChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Số lượng bán",
        data: categoryValues,
        backgroundColor: categoryLabels.map((_, i) => `hsla(${i * 60}, 70%, 60%, 0.8)`),
      },
    ],
  };

  const menuItems = [
    { title: "Quản lý sách", desc: "Thêm, sửa, xóa sách", href: "/admin/books", icon: IconBook, color: "from-blue-500 to-cyan-500" },
    { title: "Quản lý đơn hàng", desc: "Xem và xử lý đơn hàng", href: "/admin/orders", icon: IconShoppingBag, color: "from-green-500 to-emerald-500" },
    { title: "Quản lý khách hàng", desc: "Danh sách khách hàng", href: "/admin/customers", icon: IconUsers, color: "from-purple-500 to-pink-500" },
    { title: "Thống kê chi tiết", desc: "Báo cáo và phân tích", href: "/admin/analytics", icon: IconChartBar, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-primary bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-xl text-gray-600">Chào mừng trở lại! Đây là tổng quan hệ thống</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4, scale: 1.02 }} className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon size={28} className="text-white" />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Doanh thu theo tháng</h2>
          <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sách bán chạy theo thể loại</h2>
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {menuItems.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} whileHover={{ y: -4, scale: 1.02 }} onClick={() => router.push(item.href)} className="glass-card p-8 rounded-3xl cursor-pointer group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
              <IconChevronRight size={28} className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top sách bán chạy</h2>
          {stats.topBooks.length > 0 ? (
            <div className="space-y-4">
              {stats.topBooks.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md`}>{i + 1}</div>
                  <img src={item.book.coverImage} alt={item.book.title} className="w-12 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.book.title}</p>
                    <p className="text-sm text-gray-600">{typeof item.book.author === 'string' ? item.book.author : item.book.author?.name}</p>
                  </div>
                  <span className="font-bold text-gray-900">{item.quantity}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Chưa có dữ liệu</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Đơn hàng gần đây</h2>
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order: any, i: number) => (
                <div key={order._id} className="flex items-center gap-4 p-4 glass-btn rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                    <IconShoppingBag size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Đơn hàng #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                  </div>
                  <span className="font-bold text-green-600">{order.totalAmount?.toLocaleString()}đ</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Chưa có đơn hàng</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
