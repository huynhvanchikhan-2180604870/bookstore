"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconPlus, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { bookService } from "@/services/bookService";
import { IBook } from "@/types";
import toast from "react-hot-toast";
import AddBookModal from "@/components/admin/AddBookModal";
import EditBookModal from "@/components/admin/EditBookModal";
import BookDetailsModal from "@/components/admin/BookDetailsModal";

export default function AdminBooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAll({});
      setBooks(data.books || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa sách này?")) {
      try {
        await bookService.delete(id);
        toast.success("Đã xóa sách");
        fetchBooks();
      } catch (error) {
        toast.error("Không thể xóa sách");
      }
    }
  };

  const filteredBooks = books.filter((book) => {
    const authorName = typeof book.author === 'string' ? book.author : (book.author as any)?.name || '';
    return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || authorName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            <span className="gradient-primary bg-clip-text text-transparent">Quản lý sách</span>
          </h1>
          <p className="text-xl text-gray-600">Tổng số: {books.length} sách</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg">
          <IconPlus size={24} />
          Thêm sách mới
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="relative">
          <IconSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input type="text" placeholder="Tìm kiếm sách..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-16 pr-6 py-4 glass-card rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl animate-pulse">
              <div className="h-48 bg-gray-200 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedBook(book)}
              className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all cursor-pointer"
            >
              <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover rounded-2xl shadow-lg mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
              <p className="text-gray-600 mb-3">{typeof book.author === 'string' ? book.author : (book.author as any)?.name || 'N/A'}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-600">{book.price.toLocaleString()}đ</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${book.stock > 10 ? "bg-green-100 text-green-700" : book.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                  {book.stock}
                </span>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setEditingBook(book); setIsEditModalOpen(true); }} className="flex-1 px-4 py-2 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors font-semibold text-blue-600">
                  <IconEdit size={18} className="inline mr-1" /> Sửa
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(book._id)} className="flex-1 px-4 py-2 bg-red-100 rounded-xl hover:bg-red-200 transition-colors font-semibold text-red-600">
                  <IconTrash size={18} className="inline mr-1" /> Xóa
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchBooks} />
      <EditBookModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setEditingBook(null); }} onSuccess={fetchBooks} book={editingBook} />
      <BookDetailsModal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} book={selectedBook} />
    </div>
  );
}
