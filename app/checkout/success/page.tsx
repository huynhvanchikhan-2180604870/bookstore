"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { IconCheck, IconX } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useStore } from "@/store/useStore";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useStore();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const checkPayment = async () => {
      const apptransid = searchParams.get("apptransid");
      
      if (apptransid) {
        try {
          const response = await fetch(`/api/zalopay/check-status?apptransid=${apptransid}`);
          const data = await response.json();
          
          if (data.return_code === 1) {
            setStatus("success");
            clearCart();
          } else {
            setStatus("failed");
          }
        } catch (error) {
          setStatus("failed");
        }
      } else {
        setStatus("success");
        clearCart();
      }
    };

    checkPayment();
  }, [searchParams, clearCart]);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4">
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-3xl text-center"
            >
              <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900">Đang xử lý thanh toán...</h2>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-3xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
              >
                <IconCheck className="text-white" size={48} />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
              <p className="text-gray-600 mb-8">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/")}
                  className="px-8 py-3 glass-btn rounded-xl font-bold"
                >
                  Về trang chủ
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/profile/orders")}
                  className="px-8 py-3 gradient-primary text-white rounded-xl font-bold"
                >
                  Xem đơn hàng
                </motion.button>
              </div>
            </motion.div>
          )}

          {status === "failed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-3xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-6"
              >
                <IconX className="text-white" size={48} />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thanh toán thất bại</h1>
              <p className="text-gray-600 mb-8">Đơn hàng của bạn chưa được thanh toán. Vui lòng thử lại.</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/cart")}
                  className="px-8 py-3 glass-btn rounded-xl font-bold"
                >
                  Về giỏ hàng
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/checkout")}
                  className="px-8 py-3 gradient-primary text-white rounded-xl font-bold"
                >
                  Thanh toán lại
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="glass-card p-12 rounded-3xl text-center">
              <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900">Đang tải...</h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <SuccessContent />
    </Suspense>
  );
}
