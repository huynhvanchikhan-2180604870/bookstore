"use client";

import FadeIn from "@/components/animations/FadeIn";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {
  IconArrowRight,
  IconBook,
  IconShieldCheck,
  IconSparkles,
  IconStar,
  IconTrendingUp,
  IconTruck,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-60" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full mb-8"
              >
                <IconSparkles size={24} className="text-purple-600" />
                <span className="text-lg font-semibold text-gray-800">
                  Chào mừng đến BookStore 2025
                </span>
              </motion.div>

              <h1 className="text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="block text-gray-900">Khám phá</span>
                <span className="block gradient-primary bg-clip-text text-transparent">
                  Tri thức vô tận
                </span>
              </h1>

              <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Hơn 10,000 đầu sách chất lượng cao với thiết kế liquid glass
                hiện đại nhất 2025
              </p>

              <div className="flex gap-6 justify-center flex-wrap">
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-10 py-5 gradient-primary text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3"
                  >
                    <IconBook size={24} />
                    Khám phá ngay
                    <IconArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={24}
                    />
                  </motion.button>
                </Link>
                <Link href="/books">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 glass-card rounded-2xl font-bold text-lg text-gray-800 hover:shadow-xl transition-all"
                  >
                    Xem tất cả sách
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-10 glass-card p-8 rounded-3xl hidden lg:block"
          >
            <IconBook className="text-blue-600" size={48} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-20 right-10 glass-card p-8 rounded-3xl hidden lg:block"
          >
            <IconSparkles className="text-purple-600" size={48} />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                {
                  icon: IconUsers,
                  value: "50K+",
                  label: "Khách hàng",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  icon: IconBook,
                  value: "10K+",
                  label: "Đầu sách",
                  gradient: "from-purple-500 to-purple-600",
                },
                {
                  icon: IconTrendingUp,
                  value: "99%",
                  label: "Hài lòng",
                  gradient: "from-pink-500 to-pink-600",
                },
                {
                  icon: IconStar,
                  value: "4.9/5",
                  label: "Đánh giá",
                  gradient: "from-orange-500 to-orange-600",
                },
              ].map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="glass-card p-4 md:p-10 rounded-2xl md:rounded-3xl text-center hover-glow"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.gradient} text-white mb-3 md:mb-6 shadow-xl`}
                    >
                      <stat.icon size={24} className="md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-2xl md:text-5xl font-bold text-gray-900 mb-1 md:mb-3">
                      {stat.value}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-30" />
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  Tại sao chọn chúng tôi?
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Trải nghiệm mua sắm đẳng cấp 2025
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: IconBook,
                  title: "10,000+ Đầu sách",
                  desc: "Bộ sưu tập đa dạng mọi thể loại",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: IconTruck,
                  title: "Giao hàng nhanh",
                  desc: "Miễn phí ship từ 200k",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: IconShieldCheck,
                  title: "Thanh toán VNPay",
                  desc: "Bảo mật tuyệt đối",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: IconSparkles,
                  title: "Ưu đãi 50%",
                  desc: "Giảm giá hấp dẫn",
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl hover-lift group"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 md:mb-6 shadow-xl group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon size={32} className="md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-32 mx-3 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <FadeIn>
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="glass-card-dark p-8 md:p-20 rounded-3xl md:rounded-[3rem]"
              >
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-8">
                  Bắt đầu ngay hôm nay
                </h2>
                <p className="text-base md:text-2xl text-white/90 mb-6 md:mb-12">
                  Đăng ký để nhận ưu đãi 20% cho đơn hàng đầu tiên
                </p>
                <Link href="/auth/signup">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 md:px-16 md:py-6 bg-white text-purple-600 rounded-xl md:rounded-2xl font-bold text-base md:text-xl shadow-2xl"
                  >
                    Đăng ký miễn phí
                  </motion.button>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
