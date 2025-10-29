"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { IconPackage, IconTruck, IconCircleCheck, IconClock, IconX, IconChevronRight } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { user } = useStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user?._id && !user?.id) {
      setLoading(false);
      return;
    }
    try {
      const userId = user._id || user.id;
      const res = await fetch(`/api/orders/my?userId=${userId}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <IconCircleCheck className="text-green-600" size={32} />;
      case "shipping":
        return <IconTruck className="text-blue-600" size={32} />;
      case "cancelled":
        return <IconX className="text-red-600" size={32} />;
      default:
        return <IconClock className="text-yellow-600" size={32} />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: any = {
      pending: "Đang xử lý",
      processing: "Đang chuẩn bị",
      shipping: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: any = {
      pending: "from-yellow-500 to-orange-500",
      processing: "from-blue-500 to-cyan-500",
      shipping: "from-indigo-500 to-purple-500",
      delivered: "from-green-500 to-emerald-500",
      cancelled: "from-red-500 to-pink-500",
    };
    return colorMap[status] || "from-gray-500 to-gray-600";
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent">Đơn hàng của tôi</span>
            </h1>
            <p className="text-xl text-gray-600">Theo dõi và quản lý đơn hàng của bạn</p>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-8 rounded-3xl animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, i) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/profile/orders/${order._id}`)}
                  className="glass-card p-8 rounded-3xl cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getStatusColor(order.status)} flex items-center justify-center shadow-lg`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Đơn hàng #{order._id.slice(-8).toUpperCase()}</h3>
                        <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-purple-600 mb-2">{order.totalAmount?.toLocaleString()}đ</p>
                      <span className={`px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r ${getStatusColor(order.status)} shadow-md`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        {order.items?.slice(0, 2).map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                            <p className="text-gray-700">{item.bookId?.title || "Sách"} x{item.quantity}</p>
                          </div>
                        ))}
                        {order.items?.length > 2 && (
                          <p className="text-gray-500 ml-5">+{order.items.length - 2} sản phẩm khác</p>
                        )}
                      </div>
                      <IconChevronRight size={28} className="text-gray-400" />
                    </div>
                  </div>

                  {order.status === "shipping" && order.trackingNumber && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                      <p className="text-sm text-blue-600 font-semibold mb-1">Mã vận đơn</p>
                      <p className="text-lg font-bold text-blue-900">{order.trackingNumber}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-20 text-center rounded-3xl">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <IconPackage size={64} className="text-purple-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Chưa có đơn hàng</h2>
              <p className="text-xl text-gray-600 mb-8">Hãy bắt đầu mua sắm ngay!</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "/shop"} className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg">
                Khám phá sách
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
