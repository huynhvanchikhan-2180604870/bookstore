"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconShoppingCart, IconHeart, IconStar } from "@tabler/icons-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { bookService } from "@/services/bookService";
import { useStore } from "@/store/useStore";
import { IBook } from "@/types";
import toast from "react-hot-toast";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const { addToCart, addToWishlist, wishlist, user } = useStore();

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string);
      fetchReviews(params.id as string);
    }
  }, [params.id]);

  const fetchBook = async (id: string) => {
    try {
      const data = await bookService.getById(id);
      setBook(data);
    } catch (error) {
      console.error(error);
      toast.error("Không tìm thấy sách");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (bookId: string) => {
    try {
      setLoadingReviews(true);
      const res = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Đăng nhập để đánh giá");
      router.push("/auth/signin");
      return;
    }

    if (!rating || !reviewText.trim()) {
      toast.error("Vui lòng chọn số sao và viết nhận xét");
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book?._id,
          userId: user.id,
          rating,
          comment: reviewText,
        }),
      });

      if (res.ok) {
        toast.success("Đánh giá thành công!");
        setRating(0);
        setReviewText("");
        fetchReviews(book!._id);
        fetchBook(book!._id);
      } else {
        toast.error("Không thể gửi đánh giá");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleAddToCart = () => {
    if (book) {
      addToCart({
        bookId: book._id,
        title: book.title,
        price: book.discountPrice || book.price,
        coverImage: book.coverImage,
        quantity: 1,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    }
  };

  const handleToggleWishlist = () => {
    if (book) {
      addToWishlist(book._id);
      const isInWishlist = wishlist.includes(book._id);
      toast.success(isInWishlist ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích!");
    }
  };

  const images = book ? [book.coverImage, ...(book.images || [])] : [];
  const isInWishlist = book ? wishlist.includes(book._id) : false;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="glass-card p-20 rounded-3xl animate-pulse">
            <div className="w-64 h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="glass-card p-20 text-center rounded-3xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Không tìm thấy sách</h2>
            <button onClick={() => router.push("/shop")} className="px-10 py-4 gradient-primary text-white rounded-2xl font-bold">
              Quay lại cửa hàng
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-24 h-fit">
              {/* Main Image */}
              <div className="relative group mb-4">
                <div className="glass-card p-4 md:p-6 rounded-3xl shadow-2xl">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                  >
                    <img 
                      src={images[selectedImage]} 
                      alt={book.title} 
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </>
                    )}
                  </motion.div>
                </div>
                
                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                    {selectedImage + 1} / {images.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(i)}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all ${
                        selectedImage === i 
                          ? "ring-4 ring-purple-500 shadow-xl" 
                          : "opacity-60 hover:opacity-100 shadow-lg"
                      }`}
                    >
                      <img src={img} alt={`${book.title} ${i + 1}`} className="w-full h-full object-cover" />
                      {selectedImage === i && (
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Title & Author */}
              <div>
                {book.bestseller && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full mb-4 shadow-lg">
                    ⭐ BESTSELLER
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">{book.title}</h1>
                {book.author && typeof book.author === 'object' && 'name' in book.author && (
                  <p className="text-lg md:text-xl text-gray-600 font-medium">Tác giả: {(book.author as any).name}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} size={20} className={i < Math.floor(book.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{book.rating}</span>
                <span className="text-gray-500">({book.reviewCount} đánh giá)</span>
              </div>

              {/* Price Card */}
              <div className="glass-card p-6 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {book.discountPrice ? (
                      <div className="space-y-1">
                        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {book.discountPrice.toLocaleString()}đ
                        </p>
                        <div className="flex items-center gap-3">
                          <p className="text-lg text-gray-400 line-through">{book.price.toLocaleString()}đ</p>
                          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full">
                            -{Math.round((1 - book.discountPrice / book.price) * 100)}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {book.price.toLocaleString()}đ
                      </p>
                    )}
                  </div>
                </div>
                {book.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                    <p className="font-semibold">Còn {book.stock} sản phẩm</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <p className="font-semibold">Hết hàng</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                  className="flex-1 py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconShoppingCart size={22} />
                  Thêm vào giỏ hàng
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleWishlist}
                  className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                >
                  <IconHeart size={24} className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-700"} />
                </motion.button>
              </div>

              {/* Description */}
              <div className="glass-card p-6 md:p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                  Mô tả sản phẩm
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {/* Specifications */}
              <div className="glass-card p-6 md:p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                  Thông số kỹ thuật
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-1">ISBN</p>
                    <p className="font-bold text-gray-900">{book.isbn}</p>
                  </div>
                  {book.publisher && typeof book.publisher === 'object' && 'name' in book.publisher && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Nhà xuất bản</p>
                      <p className="font-bold text-gray-900">{(book.publisher as any).name}</p>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-1">Số trang</p>
                    <p className="font-bold text-gray-900">{book.pages} trang</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-1">Ngôn ngữ</p>
                    <p className="font-bold text-gray-900">{book.language}</p>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="glass-card p-6 md:p-8 rounded-3xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                    Đánh giá & Nhận xét
                  </h2>
                  <div className="flex items-center gap-2">
                    <IconStar size={20} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-lg font-bold">{book.rating}</span>
                    <span className="text-gray-500">({book.reviewCount})</span>
                  </div>
                </div>

                {/* Review Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-2xl mb-6 border-2 border-purple-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Viết đánh giá của bạn</h3>
                  
                  {/* Star Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Chọn số sao {rating > 0 && `(${rating} sao)`}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-all"
                        >
                          <IconStar
                            size={40}
                            className={`${
                              star <= (hoverRating || rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            } transition-colors`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Nhận xét của bạn
                    </label>
                    <textarea
                      rows={5}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Chia sẻ cảm nhận của bạn về cuốn sách này. Nội dung có hấp dẫn không? Chất lượng in ấn thế nào?..."
                      className="w-full px-4 py-3 glass-btn rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitReview}
                      disabled={!rating || !reviewText.trim() || submittingReview}
                      className="flex-1 py-3 gradient-primary text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingReview ? "Đang gửi..." : "Gửi đánh giá"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setRating(0);
                        setReviewText("");
                      }}
                      className="px-6 py-3 glass-btn rounded-2xl font-semibold text-gray-700"
                    >
                      Hủy
                    </motion.button>
                  </div>
                </motion.div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {loadingReviews ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto" />
                    </div>
                  ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 rounded-2xl"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                              {review.userId?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{review.userId?.name || "Người dùng"}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <IconStar
                                    key={i}
                                    size={14}
                                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <IconStar size={40} className="text-purple-600" />
                      </div>
                      <p className="text-gray-500 text-lg">Chưa có đánh giá nào</p>
                      <p className="text-gray-400 text-sm mt-2">Hãy là người đầu tiên đánh giá cuốn sách này!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
