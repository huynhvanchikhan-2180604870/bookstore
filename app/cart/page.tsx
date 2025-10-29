"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IconShoppingCart, IconTrash, IconPlus, IconMinus, IconBook, IconTruck, IconSparkles } from "@tabler/icons-react";
import { useStore } from "@/store/useStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getTotalAmount } = useStore();
  const totalAmount = getTotalAmount();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center max-w-md w-full"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full glass-card flex items-center justify-center">
                  <IconShoppingCart size={64} className="text-purple-600 md:w-20 md:h-20" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 md:p-10 rounded-3xl mb-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="gradient-primary bg-clip-text text-transparent">Giỏ hàng trống</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Khám phá hàng ngàn đầu sách tuyệt vời đang chờ bạn!
              </p>
              
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/shop")}
                  className="w-full py-4 gradient-primary text-white rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
                >
                  <IconShoppingCart size={24} />
                  Khám phá ngay
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/books")}
                  className="w-full py-4 glass-btn rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2"
                >
                  <IconBook size={24} />
                  Xem tất cả sách
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: IconBook, text: "10K+ Sách", color: "text-blue-600" },
                { icon: IconTruck, text: "Giao nhanh", color: "text-green-600" },
                { icon: IconSparkles, text: "Ưu đãi 50%", color: "text-purple-600" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-4 rounded-2xl text-center"
                >
                  <item.icon size={28} className={`mx-auto mb-2 ${item.color}`} />
                  <p className="text-xs md:text-sm font-semibold text-gray-700">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full mb-6"
            >
              <IconShoppingCart size={24} className="text-purple-600" />
              <span className="text-lg font-semibold text-gray-800">{cart.length} sản phẩm</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent">Giỏ Hàng</span>
            </h1>
            <p className="text-lg text-gray-600">Kiểm tra và hoàn tất đơn hàng của bạn</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.bookId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="glass-card p-4 md:p-5 rounded-3xl hover:shadow-xl transition-all"
                >
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-20 h-28 md:w-28 md:h-40 object-cover rounded-2xl shadow-lg" 
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          removeFromCart(item.bookId);
                          toast.success("Đã xóa khỏi giỏ hàng");
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <IconTrash size={14} />
                      </motion.button>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">Giá: {item.price.toLocaleString()}đ</p>
                      
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => item.quantity > 1 && updateQuantity(item.bookId, item.quantity - 1)}
                            className="w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                          >
                            <IconMinus size={16} />
                          </motion.button>
                          <span className="font-bold text-lg w-12 text-center bg-white rounded-xl py-1.5 shadow-sm">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            className="w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                          >
                            <IconPlus size={16} />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Tổng cộng</p>
                          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {(item.price * item.quantity).toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 md:p-8 rounded-3xl lg:sticky lg:top-24 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                    <IconShoppingCart size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Tóm tắt đơn hàng</h2>
                </div>
                
                <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-100">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tạm tính ({cart.length} sản phẩm)</span>
                    <span className="font-semibold text-gray-900">{totalAmount.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {totalAmount.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/checkout")}
                    className="w-full py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <IconShoppingCart size={20} />
                    Thanh toán ngay
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/shop")}
                    className="w-full py-4 glass-btn rounded-2xl font-semibold text-gray-700 hover:shadow-lg transition-all"
                  >
                    Tiếp tục mua sắm
                  </motion.button>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconShoppingCart size={16} />
                    <span>Giao hàng miễn phí cho đơn từ 200k</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
