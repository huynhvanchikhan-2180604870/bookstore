"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", website: "" });

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const res = await fetch("/api/publishers");
      const data = await res.json();
      setPublishers(data.publishers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/publishers/${editingId}` : "/api/publishers";
      const method = editingId ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      toast.success(editingId ? "Đã cập nhật nhà xuất bản" : "Đã thêm nhà xuất bản");
      setIsModalOpen(false);
      setFormData({ name: "", description: "", website: "" });
      setEditingId(null);
      fetchPublishers();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleEdit = (publisher: any) => {
    setFormData({ name: publisher.name, description: publisher.description, website: publisher.website });
    setEditingId(publisher._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      try {
        await fetch(`/api/publishers/${id}`, { method: "DELETE" });
        toast.success("Đã xóa nhà xuất bản");
        fetchPublishers();
      } catch (error) {
        toast.error("Không thể xóa");
      }
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            <span className="gradient-primary bg-clip-text text-transparent">Quản lý nhà xuất bản</span>
          </h1>
          <p className="text-xl text-gray-600">Tổng số: {publishers.length} nhà xuất bản</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({ name: "", description: "", website: "" }); }} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg">
          <IconPlus size={24} />
          Thêm nhà xuất bản
        </motion.button>
      </div>

      {loading ? (
        <div className="glass-card p-20 rounded-3xl animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {publishers.map((pub, i) => (
            <motion.div key={pub._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pub.name}</h3>
              <p className="text-gray-600 mb-2">{pub.description}</p>
              {pub.website && <a href={pub.website} target="_blank" className="text-blue-600 hover:underline text-sm mb-4 block">{pub.website}</a>}
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(pub)} className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200">
                  <IconEdit size={20} className="inline mr-2" />
                  Sửa
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(pub._id)} className="flex-1 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200">
                  <IconTrash size={20} className="inline mr-2" />
                  Xóa
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="glass-card rounded-3xl p-8 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">{editingId ? "Sửa nhà xuất bản" : "Thêm nhà xuất bản"}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                    <IconX size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Tên nhà xuất bản</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Mô tả</label>
                    <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Website</label>
                    <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg">
                      {editingId ? "Cập nhật" : "Thêm"}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 glass-btn rounded-xl font-bold">
                      Hủy
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
