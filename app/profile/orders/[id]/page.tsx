"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { IconPackage, IconTruck, IconCircleCheck, IconX, IconMapPin, IconCreditCard, IconArrowLeft } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();
      setOrder(data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: "pending", label: "Đang xử lý", icon: IconPackage },
      { key: "confirmed", label: "Đã xác nhận", icon: IconCircleCheck },
      { key: "shipping", label: "Đang giao", icon: IconTruck },
      { key: "delivered", label: "Đã giao", icon: IconCircleCheck },
    ];

    const statusOrder = ["pending", "confirmed", "shipping", "delivered"];
    const currentIndex = statusOrder.indexOf(order?.status);

    return steps.map((step, idx) => ({
      ...step,
      completed: idx <= currentIndex,
      active: idx === currentIndex,
    }));
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-20 min-h-screen">
          <div className="max-w-5xl mx-auto px-4">
            <div className="glass-card p-20 rounded-3xl animate-pulse">
              <div className="h-64 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-20 min-h-screen">
          <div className="max-w-5xl mx-auto px-4">
            <div className="glass-card p-20 text-center rounded-3xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Không tìm thấy đơn hàng</h2>
              <Link href="/profile/orders" className="text-purple-600 font-semibold">Quay lại danh sách đơn hàng</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const steps = getStatusSteps();

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/profile/orders" className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:gap-3 transition-all">
            <IconArrowLeft size={20} />
            Quay lại
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-5xl font-bold mb-2">
              <span className="gradient-primary bg-clip-text text-transparent">Theo dõi đơn hàng</span>
            </h1>
            <p className="text-xl text-gray-600">Đơn hàng #{order._id.slice(-8).toUpperCase()}</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Trạng thái đơn hàng</h2>
              <div className="relative">
                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${(steps.filter(s => s.completed).length - 1) / (steps.length - 1) * 100}%` }} />
                </div>
                <div className="relative flex justify-between">
                  {steps.map((step, idx) => (
                    <div key={step.key} className="flex flex-col items-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }} className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.completed ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "bg-gray-200 text-gray-400"}`}>
                        <step.icon size={28} />
                      </motion.div>
                      <p className={`text-center font-semibold ${step.active ? "text-purple-600" : step.completed ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <IconMapPin size={24} className="text-red-600" />
                  Địa chỉ giao hàng
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{order.shippingAddress?.name}</p>
                  <p>{order.shippingAddress?.phone}</p>
                  <p>{order.shippingAddress?.address}</p>
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.zipCode}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <IconCreditCard size={24} className="text-green-600" />
                  Thanh toán
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Phương thức:</span> {order.paymentMethod === "zalopay" ? "ZaloPay" : "COD"}</p>
                  <p><span className="font-semibold">Trạng thái:</span> {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                  <p><span className="font-semibold">Tổng tiền:</span> <span className="text-2xl font-bold text-green-600">{order.totalAmount?.toLocaleString()}đ</span></p>
                </div>
              </motion.div>
            </div>

            {order.trackingNumber && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <IconTruck size={24} className="text-blue-600" />
                  Thông tin vận chuyển
                </h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Mã vận đơn:</span>
                  <span className="ml-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-mono font-bold">{order.trackingNumber}</span>
                </p>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 rounded-3xl">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <IconPackage size={24} className="text-purple-600" />
                Sản phẩm ({order.items?.length || 0})
              </h3>
              <div className="space-y-4">
                {order.items?.map((item: any, idx: number) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + idx * 0.1 }} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl">
                    <img src={item.bookId?.coverImage || "/images/books/default.jpg"} alt={item.bookId?.title} className="w-20 h-28 object-cover rounded-xl shadow-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{item.bookId?.title || "Sách"}</h4>
                      <p className="text-gray-600">{item.bookId?.author || "N/A"}</p>
                      <p className="text-gray-500 text-sm mt-1">Số lượng: x{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{item.price?.toLocaleString()}đ</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
