"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { authorService } from "@/services/authorService";
import AuthorModal from "@/components/admin/AuthorModal";
import toast from "react-hot-toast";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await authorService.list();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      try {
        await authorService.delete(id);
        toast.success("Đã xóa tác giả");
        fetchAuthors();
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
            <span className="gradient-primary bg-clip-text text-transparent">Quản lý tác giả</span>
          </h1>
          <p className="text-xl text-gray-600">Tổng số: {authors.length} tác giả</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setEditingAuthor(null); setIsModalOpen(true); }} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg">
          <IconPlus size={24} />
          Thêm tác giả
        </motion.button>
      </div>

      {loading ? (
        <div className="glass-card p-20 rounded-3xl animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {authors.map((author, i) => (
            <motion.div key={author._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all">
              {author.avatar && <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{author.fullName || author.name}</h3>
              <p className="text-gray-600 mb-4 text-center">{author.bio}</p>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setEditingAuthor(author); setIsModalOpen(true); }} className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200">
                  <IconEdit size={20} className="inline mr-2" />
                  Sửa
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(author._id)} className="flex-1 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200">
                  <IconTrash size={20} className="inline mr-2" />
                  Xóa
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AuthorModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingAuthor(null); }} onSuccess={fetchAuthors} author={editingAuthor} />
    </div>
  );
}
