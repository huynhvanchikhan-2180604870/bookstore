"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { categoryService } from "@/services/categoryService";
import toast from "react-hot-toast";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: any;
}

export default function CategoryModal({ isOpen, onClose, onSuccess, category }: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (isOpen && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
      });
    } else if (isOpen && !category) {
      setFormData({ name: "", description: "", image: "" });
    }
  }, [isOpen, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Vui lòng nhập tên danh mục");

    setLoading(true);
    try {
      const body = {
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (category) {
        await categoryService.update(category._id, body);
        toast.success("Đã cập nhật danh mục");
      } else {
        await categoryService.create(body);
        toast.success("Đã thêm danh mục mới");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.error || `Không thể ${category ? "cập nhật" : "thêm"} danh mục`;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {category ? "Sửa danh mục" : "Thêm danh mục mới"}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                  <IconX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Tên danh mục *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="VD: Văn học, Kinh tế..." />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">URL ảnh (tùy chọn)</label>
                  <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="https://..." />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Mô tả (tùy chọn)</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Mô tả về danh mục..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                    {loading ? "Đang xử lý..." : category ? "Cập nhật" : "Thêm mới"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={onClose} className="px-8 py-3 glass-btn rounded-xl font-bold">
                    Hủy
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
