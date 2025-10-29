"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconChartBar, IconTrendingUp, IconCoin, IconDownload } from "@tabler/icons-react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
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

  const revenueData = {
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
  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Số lượng bán",
        data: categoryValues,
        backgroundColor: categoryLabels.map((_, i) => `hsla(${i * 60}, 70%, 60%, 0.8)`),
      },
    ],
  };

  const statusLabels = Object.keys(stats.ordersByStatus);
  const statusValues = Object.values(stats.ordersByStatus);
  const pieData = {
    labels: statusLabels.map((s: string) => {
      const map: any = { pending: "Đang xử lý", confirmed: "Đã xác nhận", shipping: "Đang giao", delivered: "Đã giao", cancelled: "Đã hủy" };
      return map[s] || s;
    }),
    datasets: [
      {
        data: statusValues,
        backgroundColor: ["rgba(251, 191, 36, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(168, 85, 247, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(239, 68, 68, 0.8)"],
      },
    ],
  };

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Th\u00e1ng,Doanh thu\n" + revenueData.labels.map((label, i) => `${label},${stats.revenueByMonth[i]}`).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `bao-cao-doanh-thu-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            <span className="gradient-primary bg-clip-text text-transparent">Thống kê & Phân tích</span>
          </h1>
          <p className="text-xl text-gray-600">Báo cáo chi tiết về hoạt động kinh doanh</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={exportReport} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg">
          <IconDownload size={24} />
          Xuất báo cáo
        </motion.button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: IconCoin, label: "Tổng doanh thu", value: `${(stats.totalRevenue / 1000000).toFixed(1)}M`, color: "from-green-500 to-emerald-500" },
          { icon: IconChartBar, label: "Đơn hàng", value: stats.totalOrders, color: "from-purple-500 to-pink-500" },
          { icon: IconTrendingUp, label: "Sách", value: stats.totalBooks, color: "from-blue-500 to-cyan-500" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-8 rounded-3xl">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg`}>
              <stat.icon size={32} className="text-white" />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-lg text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Doanh thu theo tháng</h2>
          <Line data={revenueData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sách bán chạy theo thể loại</h2>
          <Bar data={categoryData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trạng thái đơn hàng</h2>
          <div className="max-w-sm mx-auto">
            <Doughnut data={pieData} options={{ responsive: true }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top sách bán chạy</h2>
          {stats.topBooks.length > 0 ? (
            <div className="space-y-4">
              {stats.topBooks.map((item: any, i: number) => {
                const colors = ["from-blue-500 to-cyan-500", "from-green-500 to-emerald-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500", "from-pink-500 to-rose-500"];
                const maxSales = stats.topBooks[0].quantity;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white font-bold shadow-md`}>{i + 1}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.book.title}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className={`bg-gradient-to-r ${colors[i]} h-2 rounded-full`} style={{ width: `${(item.quantity / maxSales) * 100}%` }}></div>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{item.quantity}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Chưa có dữ liệu</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
