"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconCreditCard, IconTruck, IconUser, IconShieldCheck, IconCheck, IconLock, IconPackage, IconMapPin } from "@tabler/icons-react";
import AddressModal from "@/components/checkout/AddressModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalAmount, clearCart, user } = useStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("zalopay");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  useEffect(() => {
    const loadAddresses = async () => {
      if (user?._id) {
        try {
          const response = await fetch(`/api/users/${user._id}`);
          const data = await response.json();
          if (data.addresses) {
            setAddresses(data.addresses);
            const defaultAddr = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
            if (defaultAddr) setSelectedAddress(defaultAddr);
          }
        } catch (error) {
          console.error('Load addresses error:', error);
        }
      } else {
        const saved = localStorage.getItem('addresses');
        if (saved) {
          const localAddresses = JSON.parse(saved);
          setAddresses(localAddresses);
          const defaultAddr = localAddresses.find((a: any) => a.isDefault) || localAddresses[0];
          if (defaultAddr) setSelectedAddress(defaultAddr);
        }
      }
    };
    loadAddresses();
  }, [user]);

  const totalAmount = getTotalAmount();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        const userId = user?._id || user?.id;
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            items: cart,
            totalAmount,
            shippingAddress: selectedAddress,
            paymentMethod: "cod",
            paymentStatus: "pending",
          }),
        });
        toast.success("Đặt hàng thành công! Thanh toán khi nhận hàng.");
        clearCart();
        setTimeout(() => router.push("/"), 1500);
      } else if (paymentMethod === "zalopay") {
        const response = await fetch("/api/zalopay/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            orderInfo: `Thanh toan don hang`,
          }),
        });

        const data = await response.json();
        
        if (data.paymentUrl && data.apptransid) {
          const userId = user?._id || user?.id;
          const orderResponse = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              items: cart,
              totalAmount,
              shippingAddress: selectedAddress,
              paymentMethod: "zalopay",
              paymentStatus: "pending",
              transactionId: data.apptransid,
            }),
          });

          const orderData = await orderResponse.json();
          
          if (!orderData._id) {
            toast.error("Đặt hàng thất bại");
            return;
          }

          window.location.href = data.paymentUrl;
        } else {
          toast.error(data.error || "Có lỗi xảy ra");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể tạo thanh toán");
    } finally {
      setLoading(false);
    }
  };

  if (typeof window !== 'undefined' && cart.length === 0) {
    router.push("/cart");
    return null;
  }

  if (cart.length === 0) {
    return null;
  }

  const isStepValid = () => {
    if (step === 1) return selectedAddress !== null;
    return true;
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent">Thanh toán</span>
            </h1>
            <p className="text-gray-600 text-lg">Chỉ còn vài bước nữa để hoàn tất đơn hàng</p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    animate={{ scale: step >= s ? 1.1 : 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s
                        ? "gradient-primary text-white shadow-lg"
                        : "glass-card text-gray-400"
                    }`}
                  >
                    {step > s ? <IconCheck size={24} /> : s}
                  </motion.div>
                  {s < 2 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                      step > s ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="glass-card p-8 rounded-3xl border border-white/40 shadow-2xl"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                          <IconMapPin size={28} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Địa chỉ giao hàng</h2>
                          <p className="text-gray-600">Chọn địa chỉ nhận hàng</p>
                        </div>
                      </div>

                      {selectedAddress ? (
                        <div className="glass-btn p-6 rounded-2xl mb-4 border-2 border-purple-500">
                          <p className="font-bold text-lg mb-2">{selectedAddress.name} | {selectedAddress.phone}</p>
                          <p className="text-gray-600">{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.zipCode}</p>
                        </div>
                      ) : (
                        <div className="glass-card p-6 rounded-2xl mb-4 text-center text-gray-500">
                          Chưa chọn địa chỉ
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowAddressModal(true)}
                        className="w-full py-4 glass-btn rounded-2xl font-bold hover:bg-purple-50 transition-all"
                      >
                        {addresses.length > 0 ? "Chọn địa chỉ khác" : "Thêm địa chỉ mới"}
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="glass-card p-8 rounded-3xl border border-white/40 shadow-2xl"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                          <IconCreditCard size={28} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Phương thức thanh toán</h2>
                          <p className="text-gray-600">Chọn cách thanh toán phù hợp</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setPaymentMethod("zalopay")}
                          className={`glass-btn p-6 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all ${
                            paymentMethod === "zalopay" ? "border-blue-500" : "border-transparent"
                          }`}
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                            <img src="/images/zalopay.png" alt="ZaloPay" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-bold text-gray-900">ZaloPay</p>
                            <p className="text-sm text-gray-600">Thanh toán qua ví ZaloPay</p>
                          </div>
                          {paymentMethod === "zalopay" && <IconCheck className="text-blue-600" size={28} />}
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setPaymentMethod("cod")}
                          className={`glass-btn p-6 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all ${
                            paymentMethod === "cod" ? "border-green-500" : "border-transparent"
                          }`}
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                            <img src="/images/cod.png" alt="COD" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-bold text-gray-900">Thanh toán khi nhận hàng</p>
                            <p className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                          </div>
                          {paymentMethod === "cod" && <IconCheck className="text-green-600" size={28} />}
                        </motion.div>

                        <div className="glass-card p-6 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <IconShieldCheck className="text-green-600 flex-shrink-0" size={24} />
                            <div>
                              <p className="font-bold text-gray-900 mb-1">Thanh toán an toàn</p>
                              <p className="text-sm text-gray-600">Thông tin của bạn được mã hóa và bảo mật tuyệt đối</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4">
                  {step > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 py-4 glass-btn rounded-2xl font-bold text-lg"
                    >
                      Quay lại
                    </motion.button>
                  )}
                  {step < 2 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={!isStepValid()}
                      className="flex-1 py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-xl disabled:opacity-50"
                    >
                      Tiếp tục
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <IconLock size={20} />
                      {loading ? "Đang xử lý..." : paymentMethod === "cod" ? "Xác nhận đặt hàng" : "Thanh toán ngay"}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 rounded-3xl border border-white/40 shadow-2xl lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-6">
                  <IconPackage className="text-purple-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của bạn</h2>
                </div>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.bookId}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-4 glass-btn p-4 rounded-2xl"
                    >
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-16 h-20 object-cover rounded-xl shadow-md" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 mb-1 truncate">{item.title}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-purple-600 whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-bold text-gray-900">{totalAmount.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-bold text-green-600">Miễn phí</span>
                  </div>
                  <div className="glass-btn p-4 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Tổng cộng</span>
                      <span className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                        {totalAmount.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconCheck className="text-green-600" size={18} />
                    <span>Giao hàng miễn phí toàn quốc</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconCheck className="text-green-600" size={18} />
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconCheck className="text-green-600" size={18} />
                    <span>Thanh toán an toàn 100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={addresses}
        onAddressChange={(newAddresses) => {
          setAddresses(newAddresses);
          if (!user?._id) {
            localStorage.setItem('addresses', JSON.stringify(newAddresses));
          }
          const defaultAddr = newAddresses.find(a => a.isDefault) || newAddresses[0];
          if (defaultAddr) setSelectedAddress(defaultAddr);
          setShowAddressModal(false);
        }}
        userId={user?._id}
      />
    </>
  );
}
