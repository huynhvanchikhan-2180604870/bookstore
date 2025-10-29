"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconPackage, IconUser, IconMapPin, IconCreditCard, IconCalendar, IconTruck } from "@tabler/icons-react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusText = (status: string) => {
    const statusMap: any = {
      pending: "Đang xử lý",
      confirmed: "Đã xác nhận",
      rejected: "Đã từ chối",
      shipping: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: any = {
      pending: "from-yellow-500 to-orange-500",
      confirmed: "from-blue-500 to-cyan-500",
      rejected: "from-red-500 to-pink-500",
      shipping: "from-indigo-500 to-purple-500",
      delivered: "from-green-500 to-emerald-500",
      cancelled: "from-gray-500 to-slate-500",
    };
    return colorMap[status] || "from-gray-500 to-gray-600";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 glass-card p-6 flex justify-between items-center border-b border-gray-200 z-10">
                <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">Chi tiết đơn hàng</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <IconX size={28} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Đơn hàng #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <IconCalendar size={18} />
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <span className={`px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${getStatusColor(order.status)} shadow-lg`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <IconUser size={20} className="text-purple-600" />
                      Thông tin khách hàng
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-semibold">Tên:</span> {order.userId?.name || order.shippingAddress?.name || "Khách"}</p>
                      <p><span className="font-semibold">Email:</span> {order.userId?.email || "N/A"}</p>
                      <p><span className="font-semibold">SĐT:</span> {order.shippingAddress?.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <IconMapPin size={20} className="text-red-600" />
                      Địa chỉ giao hàng
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IconPackage size={20} className="text-blue-600" />
                    Sản phẩm ({order.items?.length || 0})
                  </h4>
                  <div className="space-y-4">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                        <img src={item.bookId?.coverImage || "/images/books/default.jpg"} alt={item.bookId?.title} className="w-16 h-20 object-cover rounded-lg shadow-md" />
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900">{item.bookId?.title || "Sách"}</h5>
                          <p className="text-gray-600 text-sm">{item.bookId?.author || "N/A"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{item.price?.toLocaleString()}đ</p>
                          <p className="text-gray-600 text-sm">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <IconCreditCard size={20} className="text-green-600" />
                      Thanh toán
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-semibold">Phương thức:</span> {order.paymentMethod === "zalopay" ? "ZaloPay" : "COD"}</p>
                      <p><span className="font-semibold">Trạng thái:</span> {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                      {order.transactionId && <p><span className="font-semibold">Mã GD:</span> {order.transactionId}</p>}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="glass-card p-6 rounded-2xl">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <IconTruck size={20} className="text-orange-600" />
                        Vận chuyển
                      </h4>
                      <p className="text-gray-700">
                        <span className="font-semibold">Mã vận đơn:</span>
                        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-mono">{order.trackingNumber}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-4xl font-bold text-green-600">{order.totalAmount?.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
