"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconBook, IconSearch, IconSparkles } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { bookService } from "@/services/bookService";
import { IBook } from "@/types";
import BookCard from "@/components/books/BookCard";

export default function ShopPage() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    fetchData();
  }, [filter, page]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
      const res = await bookService.getAll({ search: searchTerm, page: 1, limit });
      setBooks(res.books || []);
      setTotalPages(res.pagination?.pages || 1);
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [booksRes, categoriesRes] = await Promise.all([
        bookService.getAll({ category: filter !== "all" ? filter : undefined, page, limit }),
        fetch("/api/categories"),
      ]);
      
      const categoriesData = await categoriesRes.json();
      setBooks(booksRes.books || []);
      setTotalPages(booksRes.pagination?.pages || 1);
      setCategories([{ _id: "all", name: "Tất cả" }, ...(categoriesData.categories || [])]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (index: number) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-yellow-500 to-orange-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card rounded-full mb-4 sm:mb-6"
            >
              <IconSparkles className="text-orange-600 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-lg font-semibold text-gray-800">Ưu đãi đặc biệt</span>
            </motion.div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="gradient-primary bg-clip-text text-transparent inline-block"
              >
                Kho Tàng Sách
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-4"
            >
              Giảm giá đến <span className="font-bold text-orange-600">50%</span> cho hàng nghìn đầu sách bán chạy
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <IconSearch className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm sách..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-5 glass-card rounded-2xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="px-6 sm:px-8 py-3 sm:py-5 gradient-primary text-white rounded-2xl font-bold shadow-lg flex items-center gap-2"
              >
                <IconSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Tìm</span>
              </motion.button>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="px-4 sm:px-6 py-2 sm:py-3 glass-card rounded-xl w-24 sm:w-32 h-10 sm:h-12 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat._id === "all" ? "all" : cat.name)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center gap-1 sm:gap-2 transition-all text-sm sm:text-base ${
                    filter === (cat._id === "all" ? "all" : cat.name)
                      ? `bg-gradient-to-r ${getCategoryIcon(i)} text-white shadow-lg`
                      : "glass-card text-gray-700 hover:shadow-md"
                  }`}
                >
                  {cat._id === "all" && <IconSparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
                  {cat.name}
                </motion.button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl h-72 sm:h-96 animate-pulse" />
              ))}
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {books.map((book, index) => (
                  <BookCard key={book._id} book={book} index={index} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-3 glass-card rounded-xl font-semibold disabled:opacity-50"
                  >
                    Trước
                  </button>
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-12 h-12 rounded-xl font-semibold ${
                          page === i + 1 ? "gradient-primary text-white" : "glass-card text-gray-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-6 py-3 glass-card rounded-xl font-semibold disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 sm:p-20 text-center rounded-3xl">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
              >
                <IconBook className="text-purple-600 w-12 h-12 sm:w-16 sm:h-16" />
              </motion.div>
              <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Chưa có sách trong danh mục này</h3>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">Hãy thử tìm kiếm danh mục khác hoặc quay lại sau</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("all")}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg"
              >
                Xem tất cả sách
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
