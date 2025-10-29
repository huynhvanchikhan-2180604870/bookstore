"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconLock, IconBell, IconShield, IconLanguage, IconMoon, IconTrash } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "vi",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Đổi mật khẩu thành công!");
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent">Cài đặt</span>
            </h1>
            <p className="text-xl text-gray-600">Quản lý cài đặt tài khoản và bảo mật</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-10 rounded-3xl mb-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <IconLock size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Đổi mật khẩu</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Mật khẩu hiện tại</label>
                <input type="password" className="w-full px-6 py-4 glass-btn rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Mật khẩu mới</label>
                <input type="password" className="w-full px-6 py-4 glass-btn rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Xác nhận mật khẩu mới</label>
                <input type="password" className="w-full px-6 py-4 glass-btn rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg">
                Cập nhật mật khẩu
              </motion.button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-10 rounded-3xl mb-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <IconBell size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Thông báo</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 glass-btn rounded-2xl">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Thông báo đẩy</p>
                  <p className="text-gray-600">Nhận thông báo về đơn hàng và ưu đãi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} className="sr-only peer" />
                  <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 glass-btn rounded-2xl">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Email marketing</p>
                  <p className="text-gray-600">Nhận email về sản phẩm mới và khuyến mãi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.emailUpdates} onChange={(e) => setSettings({ ...settings, emailUpdates: e.target.checked })} className="sr-only peer" />
                  <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-10 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                <IconTrash size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Vùng nguy hiểm</h2>
            </div>

            <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-200">
              <p className="text-lg font-semibold text-red-900 mb-4">Xóa tài khoản</p>
              <p className="text-red-700 mb-6">Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.</p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors">
                Xóa tài khoản
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
