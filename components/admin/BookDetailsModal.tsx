"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconBook, IconUser, IconBuilding, IconCalendar, IconBarcode, IconLanguage, IconFileText, IconStar } from "@tabler/icons-react";
import { IBook } from "@/types";

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: IBook | null;
}

export default function BookDetailsModal({ isOpen, onClose, book }: BookDetailsModalProps) {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 glass-card p-6 flex justify-between items-center border-b border-gray-200 z-10">
                <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">Chi tiết sách</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <IconX size={28} />
                </button>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <img src={book.coverImage} alt={book.title} className="w-full rounded-2xl shadow-2xl" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <IconStar className="text-yellow-500" size={24} fill="currentColor" />
                        <span className="text-2xl font-bold">{book.rating || 0}</span>
                        <span className="text-gray-600">({book.reviewCount || 0} đánh giá)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconUser size={20} className="text-purple-600" />
                      <span className="font-semibold">Tác giả:</span>
                      <span>{typeof book.author === 'string' ? book.author : (book.author as any)?.name || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconBuilding size={20} className="text-blue-600" />
                      <span className="font-semibold">Nhà xuất bản:</span>
                      <span>{typeof book.publisher === 'string' ? book.publisher : (book.publisher as any)?.name || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconCalendar size={20} className="text-green-600" />
                      <span className="font-semibold">Năm xuất bản:</span>
                      <span>{book.publishDate ? new Date(book.publishDate).getFullYear() : "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconBarcode size={20} className="text-orange-600" />
                      <span className="font-semibold">ISBN:</span>
                      <span>{book.isbn || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconLanguage size={20} className="text-pink-600" />
                      <span className="font-semibold">Ngôn ngữ:</span>
                      <span>{book.language || "Tiếng Việt"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IconFileText size={20} className="text-indigo-600" />
                      <span className="font-semibold">Số trang:</span>
                      <span>{book.pages || "N/A"}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Giá gốc:</span>
                        <span className="text-2xl font-bold text-gray-400 line-through">{book.price.toLocaleString()}đ</span>
                      </div>
                      {book.discountPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Giá khuyến mãi:</span>
                          <span className="text-3xl font-bold text-green-600">{book.discountPrice.toLocaleString()}đ</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <span className="font-semibold text-gray-700">Tồn kho:</span>
                      <span className={`ml-3 px-4 py-2 rounded-xl font-bold ${book.stock > 10 ? "bg-green-100 text-green-700" : book.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {book.stock} cuốn
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IconBook size={24} className="text-purple-600" />
                    Mô tả sách
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
