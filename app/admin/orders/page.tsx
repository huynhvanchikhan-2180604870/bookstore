"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPackage, IconTruck, IconCircleCheck, IconX, IconChevronDown } from "@tabler/icons-react";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders?admin=true");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <IconCircleCheck className="text-green-600" size={28} />;
      case "shipping":
        return <IconTruck className="text-blue-600" size={28} />;
      case "cancelled":
        return <IconX className="text-red-600" size={28} />;
      default:
        return <IconPackage className="text-gray-600" size={28} />;
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
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipping: "bg-indigo-100 text-indigo-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colorMap[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2">
          <span className="gradient-primary bg-clip-text text-transparent">Quản lý đơn hàng</span>
        </h1>
        <p className="text-xl text-gray-600">Tổng số: {orders.length} đơn hàng</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl animate-pulse">
              <div className="h-48 bg-gray-200 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order: any, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedOrder(order)}
              className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(order.status).replace('bg-', 'from-').replace('-100', '-500')} flex items-center justify-center shadow-lg`}>
                  {getStatusIcon(order.status)}
                </div>
                <span className="text-sm font-bold text-gray-500">#{order._id.slice(-6)}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{order.userId?.name || "Khách"}</h3>
              <p className="text-sm text-gray-600 mb-4">{new Date(order.createdAt).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}</p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-gray-600">Tổng tiền</span>
                <span className="text-2xl font-bold text-green-600">{order.totalAmount?.toLocaleString()}đ</span>
              </div>

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === order._id ? null : order._id)}
                  className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-between"
                >
                  {getStatusText(order.status)}
                  <IconChevronDown size={18} className={`transition-transform ${openDropdown === order._id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === order._id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 right-0 glass-card rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {[
                        { value: 'pending', label: 'Đang xử lý' },
                        { value: 'confirmed', label: 'Đã xác nhận' },
                        { value: 'rejected', label: 'Đã từ chối' },
                        { value: 'shipping', label: 'Đang giao' },
                        { value: 'delivered', label: 'Đã giao' },
                        { value: 'cancelled', label: 'Đã hủy' },
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={async () => {
                            try {
                              await fetch(`/api/orders/${order._id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ status: status.value }),
                              });
                              setOpenDropdown(null);
                              fetchOrders();
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                          className={`w-full px-4 py-3 text-left font-semibold text-gray-700 hover:bg-green-50 transition-colors ${order.status === status.value ? 'bg-green-100' : ''}`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <OrderDetailsModal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} order={selectedOrder} />
    </div>
  );
}
