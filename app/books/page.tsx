"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconFilter, IconSparkles, IconBook, IconX, IconCheck, IconClock, IconCurrencyDollar, IconTrendingUp, IconStar } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookCard from "@/components/books/BookCard";
import { bookService } from "@/services/bookService";
import { IBook } from "@/types";

export default function BooksPage() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchBooks();
  }, [page]);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, sortBy, priceRange, selectedCategories]);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAll({ page, limit: itemsPerPage });
      setBooks(data.books || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBooks = () => {
    let result = [...books];

    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result = result.filter((book) => book.price >= priceRange.min && book.price <= priceRange.max);

    if (selectedCategories.length > 0) {
      result = result.filter((book) => selectedCategories.includes(book.category as any));
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredBooks(result);
  };

  const sortOptions = [
    { value: "newest", label: "Mới nhất", icon: IconClock },
    { value: "price-low", label: "Giá thấp", icon: IconCurrencyDollar },
    { value: "price-high", label: "Giá cao", icon: IconTrendingUp },
    { value: "popular", label: "Phổ biến", icon: IconStar },
  ];

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full mb-6"
            >
              <IconSparkles size={24} className="text-purple-600" />
              <span className="text-lg font-semibold text-gray-800">Bộ sưu tập đặc biệt</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="gradient-primary bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                Thế Giới Tri Thức
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Hơn <span className="font-bold text-purple-600">10,000+</span> đầu sách chọn lọc từ khắp thế giới
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 glass-card rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowFilterModal(true)} className="px-4 py-3 glass-card rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                <IconFilter size={20} />
                <span className="hidden sm:inline">Lọc</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-sm md:text-base text-gray-600">
                <span className="font-bold text-gray-900">{filteredBooks.length}</span> kết quả
              </p>
            </motion.div>

            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 md:px-5 py-2 md:py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    sortBy === option.value ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "glass-card text-gray-700"
                  }`}
                >
                  <option.icon size={20} />
                  <span className="hidden lg:inline text-sm md:text-base">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
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
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => setPage(pageNum)}
                          className={`w-12 h-12 rounded-xl font-semibold ${
                            page === pageNum ? "gradient-primary text-white" : "glass-card text-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
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
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-20 text-center rounded-3xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
              >
                <IconBook size={64} className="text-blue-600" />
              </motion.div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Không tìm thấy sách</h3>
              <p className="text-xl text-gray-600 mb-8">Hãy thử tìm kiếm với từ khóa khác hoặc khám phá các danh mục</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange({ min: 0, max: 1000000 });
                  setSelectedCategories([]);
                }}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg"
              >
                Xóa bộ lọc
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {showFilterModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilterModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">Bộ lọc</h2>
                  <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                    <IconX size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-4">Khoảng giá</label>
                    <div className="flex gap-4 items-center">
                      <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} placeholder="Từ" className="flex-1 px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      <span className="text-gray-500">-</span>
                      <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} placeholder="Đến" className="flex-1 px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowFilterModal(false)} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg">
                      <IconCheck size={20} className="inline mr-2" />
                      Áp dụng
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setPriceRange({ min: 0, max: 1000000 });
                        setSelectedCategories([]);
                      }}
                      className="px-8 py-3 glass-btn rounded-xl font-bold"
                    >
                      Đặt lại
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
