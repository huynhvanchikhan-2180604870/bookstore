"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { bookService } from "@/services/bookService";
import toast from "react-hot-toast";

export default function CreateBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    isbn: "",
    publisher: "",
    pages: 0,
    language: "Tiếng Việt",
    coverImage: "",
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookService.create(formData);
      toast.success("Đã thêm sách mới");
      router.push("/admin/books");
    } catch (error) {
      toast.error("Không thể thêm sách");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-16">Thêm sách mới</h1>

          <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Tên sách</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Tác giả</label>
                <input type="text" required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Giá (VNĐ)</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Số lượng</label>
                <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">ISBN</label>
                <input type="text" required value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Nhà xuất bản</label>
                <input type="text" required value={formData.publisher} onChange={(e) => setFormData({ ...formData, publisher: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Số trang</label>
                <input type="number" required value={formData.pages} onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Ngôn ngữ</label>
                <input type="text" required value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">URL ảnh bìa</label>
              <input type="url" required value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Mô tả</label>
              <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5} className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="flex gap-4 pt-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex-1 py-5 gradient-primary text-white rounded-2xl font-bold text-xl shadow-2xl disabled:opacity-50">
                {loading ? "Đang xử lý..." : "Thêm sách"}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => router.back()} className="px-10 py-5 glass-btn rounded-2xl font-bold text-xl">
                Hủy
              </motion.button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
