"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { bookService } from "@/services/bookService";
import { categoryService } from "@/services/categoryService";
import { authorService } from "@/services/authorService";
import { publisherService } from "@/services/publisherService";
import SearchableSelect from "@/components/ui/SearchableSelect";
import QuickAddModal from "@/components/ui/QuickAddModal";
import toast from "react-hot-toast";

type Option = { _id: string; name?: string; fullName?: string; title?: string };

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBookModal({ isOpen, onClose, onSuccess }: AddBookModalProps) {
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  const [categories, setCategories] = useState<Option[]>([]);
  const [authors, setAuthors] = useState<Option[]>([]);
  const [publishers, setPublishers] = useState<Option[]>([]);
  
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    discountPrice: undefined as number | undefined,
    isbn: "",
    publisher: "",
    publishDate: "",
    pages: 1,
    language: "Tiếng Việt",
    coverImage: "",
    images: [] as string[],
    stock: 0,
    category: "",
    featured: false,
    bestseller: false,
  });
  
  const loadOptions = async () => {
    try {
      const [cats, aus, pubs] = await Promise.all([
        categoryService.list(),
        authorService.list(),
        publisherService.list(),
      ]);
      setCategories(cats);
      setAuthors(aus);
      setPublishers(pubs);
    } catch (e) {
      console.error(e);
      toast.error("Không tải được danh mục / tác giả / NXB");
    } finally {
      setLoadingOptions(false);
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      loadOptions();
    }
  }, [isOpen]);
  
  const handleQuickAddCategory = async (name: string) => {
    await categoryService.create({ name, slug: name.toLowerCase().replace(/\s+/g, "-") });
    await loadOptions();
    toast.success("Đã thêm danh mục");
  };
  
  const handleQuickAddAuthor = async (name: string) => {
    await authorService.create({ fullName: name });
    await loadOptions();
    toast.success("Đã thêm tác giả");
  };
  
  const handleQuickAddPublisher = async (name: string) => {
    await publisherService.create({ name });
    await loadOptions();
    toast.success("Đã thêm nhà xuất bản");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) return toast.error("Vui lòng chọn danh mục");
    if (!formData.author) return toast.error("Vui lòng chọn tác giả");
    if (!formData.publisher) return toast.error("Vui lòng chọn nhà xuất bản");
    if (formData.pages <= 0) return toast.error("Số trang phải lớn hơn 0");
    if (!formData.publishDate) return toast.error("Vui lòng chọn ngày xuất bản");
    
    setLoading(true);
    try {
      const body = {
        ...formData,
        publishDate: new Date(formData.publishDate).toISOString(),
        images: formData.images.filter(img => img.trim()),
      };
      await bookService.create(body);
      toast.success("Đã thêm sách mới");
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.error || "Không thể thêm sách";
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
            <div className="glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">Thêm sách mới</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                  <IconX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-2">Tên sách</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  
                  <SearchableSelect label="Danh mục" value={formData.category} options={categories} onChange={(val) => setFormData({ ...formData, category: val })} onQuickAdd={() => setShowCategoryModal(true)} placeholder="-- Chọn danh mục --" required loading={loadingOptions} />
                  <SearchableSelect label="Tác giả" value={formData.author} options={authors} onChange={(val) => setFormData({ ...formData, author: val })} onQuickAdd={() => setShowAuthorModal(true)} placeholder="-- Chọn tác giả --" required loading={loadingOptions} />
                  <SearchableSelect label="Nhà xuất bản" value={formData.publisher} options={publishers} onChange={(val) => setFormData({ ...formData, publisher: val })} onQuickAdd={() => setShowPublisherModal(true)} placeholder="-- Chọn NXB --" required loading={loadingOptions} />
                  
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Giá (VNĐ)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Số lượng</label>
                    <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">ISBN</label>
                    <input type="text" required value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Số trang</label>
                    <input type="number" required min={1} value={formData.pages} onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Ngày xuất bản</label>
                    <input type="date" required value={formData.publishDate} onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">URL ảnh bìa</label>
                  <input type="url" required value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-semibold text-gray-700">Ảnh phụ (tùy chọn)</label>
                    <button type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })} className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                      + Thêm ảnh
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="url" value={url} onChange={(e) => {
                          const next = [...formData.images];
                          next[idx] = e.target.value;
                          setFormData({ ...formData, images: next });
                        }} placeholder={`URL ảnh #${idx + 1}`} className="flex-1 px-4 py-2 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <button type="button" onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })} className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Mô tả</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-3 glass-btn rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                    {loading ? "Đang xử lý..." : "Thêm sách"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={onClose} className="px-8 py-3 glass-btn rounded-xl font-bold">
                    Hủy
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
          
          <QuickAddModal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} onSubmit={handleQuickAddCategory} title="Thêm danh mục mới" fieldLabel="Tên danh mục" placeholder="Nhập tên danh mục..." />
          <QuickAddModal isOpen={showAuthorModal} onClose={() => setShowAuthorModal(false)} onSubmit={handleQuickAddAuthor} title="Thêm tác giả mới" fieldLabel="Tên tác giả" placeholder="Nhập tên tác giả..." />
          <QuickAddModal isOpen={showPublisherModal} onClose={() => setShowPublisherModal(false)} onSubmit={handleQuickAddPublisher} title="Thêm nhà xuất bản mới" fieldLabel="Tên nhà xuất bản" placeholder="Nhập tên nhà xuất bản..." />
        </>
      )}
    </AnimatePresence>
  );
}
