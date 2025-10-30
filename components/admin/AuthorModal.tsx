"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { authorService } from "@/services/authorService";
import toast from "react-hot-toast";

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  author?: any;
}

export default function AuthorModal({ isOpen, onClose, onSuccess, author }: AuthorModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && author) {
      setFormData({
        name: author.name || author.name || "",
        bio: author.bio || "",
        avatar: author.avatar || "",
      });
    } else if (isOpen && !author) {
      setFormData({ name: "", bio: "", avatar: "" });
    }
  }, [isOpen, author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Vui lòng nhập tên tác giả");

    setLoading(true);
    try {
      if (author) {
        await authorService.update(author._id, formData);
        toast.success("Đã cập nhật tác giả");
      } else {
        await authorService.create(formData);
        toast.success("Đã thêm tác giả mới");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.error || `Không thể ${author ? "cập nhật" : "thêm"} tác giả`;
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
                  {author ? "Sửa tác giả" : "Thêm tác giả mới"}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                  <IconX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Tên tác giả *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="VD: Nguyễn Nhật Ánh" />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">URL ảnh đại diện (tùy chọn)</label>
                  <input type="url" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="https://..." />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Tiểu sử (tùy chọn)</label>
                  <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Thông tin về tác giả..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                    {loading ? "Đang xử lý..." : author ? "Cập nhật" : "Thêm mới"}
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
