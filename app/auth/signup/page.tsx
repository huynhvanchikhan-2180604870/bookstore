"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconUser, IconMail, IconLock, IconBook } from "@tabler/icons-react";
import { useStore } from "@/store/useStore";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);

    try {
      const data = await userService.signup({ name, email, password });
      setUser(data.user, data.token);
      toast.success("Đăng ký thành công!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-2xl">
            <IconBook size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Đăng ký</h1>
          <p className="text-xl text-gray-600">Tạo tài khoản BookStore mới</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Họ và tên</label>
            <div className="relative">
              <IconUser size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-14 pr-6 py-4 glass-card rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Email</label>
            <div className="relative">
              <IconMail size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 glass-card rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Mật khẩu</label>
            <div className="relative">
              <IconLock size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 glass-card rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Xác nhận mật khẩu</label>
            <div className="relative">
              <IconLock size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 glass-card rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-2xl disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-lg text-gray-600">
          Đã có tài khoản?{" "}
          <Link href="/auth/signin" className="text-purple-600 font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
