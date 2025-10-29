"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconHeart } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookCard from "@/components/books/BookCard";
import { useStore } from "@/store/useStore";
import { bookService } from "@/services/bookService";
import { IBook } from "@/types";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist } = useStore();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistBooks();
  }, [wishlist]);

  const fetchWishlistBooks = async () => {
    if (wishlist.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const allBooks = await bookService.getAll({ limit: 100 });
      const wishlistBooks = allBooks.books.filter((book: IBook) => wishlist.includes(book._id));
      setBooks(wishlistBooks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full mb-6"
            >
              <IconHeart size={24} className="text-pink-600" />
              <span className="text-lg font-semibold text-gray-800">Bộ sưu tập của bạn</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <motion.span
                animate={{ color: ["#9333ea", "#ec4899", "#9333ea"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="gradient-primary bg-clip-text text-transparent"
              >
                Yêu Thích
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Lưu giữ những cuốn sách bạn đam mê và muốn sở hữu
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card rounded-3xl h-96 animate-pulse" />
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-20 text-center rounded-3xl"
            >
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                <IconHeart size={64} className="text-pink-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Chưa có sách yêu thích</h2>
              <p className="text-xl text-gray-600 mb-8">Hãy thêm những cuốn sách bạn yêu thích vào đây</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/shop")}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg"
              >
                Khám phá sách ngay
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
