"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconHeart, IconShoppingCart, IconStar } from "@tabler/icons-react";
import { IBook } from "@/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";

interface BookCardProps {
  book: IBook;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.includes(book._id);
  
  const getAuthorName = () => {
    if (!book.author) return '';
    if (typeof book.author === 'object' && 'name' in book.author) {
      return (book.author as any).name;
    }
    return '';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      bookId: book._id,
      title: book.title,
      price: book.discountPrice || book.price,
      quantity: 1,
      coverImage: book.coverImage,
    });
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(book._id);
    toast.success(isInWishlist ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích!");
  };

  return (
    <Link href={`/books/${book._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group cursor-pointer h-full"
      >
        <div className="relative h-full glass-card rounded-3xl p-4 hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3 transition-all duration-500">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={book.coverImage || "/images/books/placeholder.jpg"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {book.bestseller && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm"
                >
                  ⭐ BESTSELLER
                </motion.div>
              )}
              {book.discountPrice && (
                <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  -{Math.round((1 - book.discountPrice / book.price) * 100)}%
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <IconHeart size={18} className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-700"} />
              </motion.button>
            </div>
            
            {/* Quick Add to Cart - Show on Hover */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-3 bg-white/95 backdrop-blur-md rounded-2xl font-bold text-gray-900 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <IconShoppingCart size={18} />
                <span className="text-sm">Thêm vào giỏ</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="px-1">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors">
              {book.title}
            </h3>
            
            {getAuthorName() && (
              <p className="text-sm text-gray-600 mb-2 truncate">{getAuthorName()}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <IconStar
                    key={i}
                    size={14}
                    className={i < Math.floor(book.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">{book.rating}</span>
              <span className="text-xs text-gray-400">({book.reviewCount})</span>
            </div>

            {/* Price */}
            <div>
              {book.discountPrice ? (
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {book.discountPrice.toLocaleString()}đ
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {book.price.toLocaleString()}đ
                  </span>
                </div>
              ) : (
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {book.price.toLocaleString()}đ
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
