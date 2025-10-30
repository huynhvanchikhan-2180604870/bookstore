"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SearchableSelect from "@/components/ui/SearchableSelect";
import QuickAddModal from "@/components/ui/QuickAddModal";
import { authorService } from "@/services/authorService";
import { bookService } from "@/services/bookService";
import { categoryService } from "@/services/categoryService";
import { publisherService } from "@/services/publisherService";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type Option = { _id: string; name?: string; fullName?: string; title?: string };

export default function CreateBookPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [categories, setCategories] = useState<Option[]>([]);
  const [authors, setAuthors] = useState<Option[]>([]);
  const [publishers, setPublishers] = useState<Option[]>([]);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "", // ObjectId string
    description: "",
    price: 0,
    discountPrice: undefined as number | undefined,
    isbn: "",
    publisher: "", // ObjectId string
    publishDate: "", // yyyy-mm-dd
    pages: 1,
    language: "Vietnamese",
    coverImage: "",
    images: [] as string[],
    stock: 0,
    category: "", // ObjectId string
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
    loadOptions();
  }, []);

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

  const canSubmit = useMemo(() => {
    const f = formData;
    return (
      f.title.trim() &&
      f.author &&
      f.publisher &&
      f.category &&
      f.description.trim() &&
      f.price > 0 &&
      f.isbn.trim() &&
      f.publishDate && // yyyy-mm-dd
      f.pages > 0 &&
      f.coverImage.trim()
    );
  }, [formData]);

  const onChange = <K extends keyof typeof formData>(
    key: K,
    val: (typeof formData)[K]
  ) => {
    setFormData((p) => ({ ...p, [key]: val }));
  };

  const handleAddImage = () => {
    setFormData((p) => ({ ...p, images: [...p.images, ""] }));
  };

  const handleImageChange = (idx: number, url: string) => {
    const next = [...formData.images];
    next[idx] = url;
    setFormData((p) => ({ ...p, images: next }));
  };

  const handleRemoveImage = (idx: number) => {
    const next = formData.images.filter((_, i) => i !== idx);
    setFormData((p) => ({ ...p, images: next }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Detailed validation
    if (!formData.title.trim()) return toast.error("Vui lòng nhập tên sách");
    if (!formData.category) return toast.error("Vui lòng chọn danh mục");
    if (!formData.author) return toast.error("Vui lòng chọn tác giả");
    if (!formData.publisher) return toast.error("Vui lòng chọn nhà xuất bản");
    if (!formData.description.trim()) return toast.error("Vui lòng nhập mô tả");
    if (formData.price <= 0) return toast.error("Giá phải lớn hơn 0");
    if (!formData.isbn.trim()) return toast.error("Vui lòng nhập ISBN");
    if (formData.pages <= 0) return toast.error("Số trang phải lớn hơn 0");
    if (!formData.publishDate) return toast.error("Vui lòng chọn ngày xuất bản");
    if (!formData.coverImage.trim()) return toast.error("Vui lòng nhập URL ảnh bìa");
    
    setSubmitting(true);
    try {
      const body = {
        ...formData,
        publishDate: new Date(formData.publishDate).toISOString(),
        images: formData.images.filter(img => img.trim()),
      };

      const result = await bookService.create(body);
      toast.success("Đã thêm sách mới");
      router.push("/admin/books");
    } catch (error: any) {
      console.error("Create book error:", error);
      const msg = error?.response?.data?.error || error?.message || "Không thể thêm sách";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-16">
            Thêm sách mới
          </h1>

          <form
            onSubmit={handleSubmit}
            className="glass-card p-10 rounded-3xl space-y-6"
          >
            {/* Loading state for options */}
            {loadingOptions && (
              <div className="text-gray-600">
                Đang tải danh mục / tác giả / NXB…
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Tên sách
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => onChange("title", e.target.value)}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category */}
              <SearchableSelect
                label="Danh mục"
                value={formData.category}
                options={categories}
                onChange={(val) => onChange("category", val)}
                onQuickAdd={() => setShowCategoryModal(true)}
                placeholder="-- Chọn danh mục --"
                required
                loading={loadingOptions}
              />

              {/* Author */}
              <SearchableSelect
                label="Tác giả"
                value={formData.author}
                options={authors}
                onChange={(val) => onChange("author", val)}
                onQuickAdd={() => setShowAuthorModal(true)}
                placeholder="-- Chọn tác giả --"
                required
                loading={loadingOptions}
              />

              {/* Publisher */}
              <SearchableSelect
                label="Nhà xuất bản"
                value={formData.publisher}
                options={publishers}
                onChange={(val) => onChange("publisher", val)}
                onQuickAdd={() => setShowPublisherModal(true)}
                placeholder="-- Chọn NXB --"
                required
                loading={loadingOptions}
              />

              {/* Price */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Giá (VNĐ)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.price}
                  onChange={(e) => onChange("price", Number(e.target.value))}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Discount price (optional) */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Giá khuyến mãi (tuỳ chọn)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.discountPrice ?? ""}
                  onChange={(e) =>
                    onChange(
                      "discountPrice",
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Số lượng
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.stock}
                  onChange={(e) => onChange("stock", Number(e.target.value))}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  ISBN
                </label>
                <input
                  type="text"
                  required
                  value={formData.isbn}
                  onChange={(e) => onChange("isbn", e.target.value)}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Pages */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Số trang
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.pages}
                  onChange={(e) => onChange("pages", Number(e.target.value))}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Ngôn ngữ
                </label>
                <input
                  type="text"
                  required
                  value={formData.language}
                  onChange={(e) => onChange("language", e.target.value)}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Publish date */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Ngày xuất bản
                </label>
                <input
                  type="date"
                  required
                  value={formData.publishDate}
                  onChange={(e) => onChange("publishDate", e.target.value)}
                  className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Featured / Bestseller */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => onChange("featured", e.target.checked)}
                  />
                  <span>Nổi bật</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => onChange("bestseller", e.target.checked)}
                  />
                  <span>Bán chạy</span>
                </label>
              </div>
            </div>

            {/* Cover image */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                URL ảnh bìa
              </label>
              <input
                type="url"
                required
                value={formData.coverImage}
                onChange={(e) => onChange("coverImage", e.target.value)}
                className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Extra images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-lg font-semibold text-gray-700">
                  Ảnh phụ (tuỳ chọn)
                </label>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 glass-btn rounded-xl"
                >
                  + Thêm ảnh
                </button>
              </div>
              <div className="space-y-3">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      placeholder={`URL ảnh #${idx + 1}`}
                      className="flex-1 px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="px-4 py-2 glass-btn rounded-xl"
                    >
                      Xoá
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Mô tả
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                rows={5}
                className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting || loadingOptions || !canSubmit}
                className="flex-1 py-5 gradient-primary text-white rounded-2xl font-bold text-xl shadow-2xl disabled:opacity-50"
              >
                {submitting ? "Đang xử lý..." : "Thêm sách"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => router.back()}
                className="px-10 py-5 glass-btn rounded-2xl font-bold text-xl"
              >
                Hủy
              </motion.button>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      {/* Quick Add Modals */}
      <QuickAddModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSubmit={handleQuickAddCategory}
        title="Thêm danh mục mới"
        fieldLabel="Tên danh mục"
        placeholder="Nhập tên danh mục..."
      />

      <QuickAddModal
        isOpen={showAuthorModal}
        onClose={() => setShowAuthorModal(false)}
        onSubmit={handleQuickAddAuthor}
        title="Thêm tác giả mới"
        fieldLabel="Tên tác giả"
        placeholder="Nhập tên tác giả..."
      />

      <QuickAddModal
        isOpen={showPublisherModal}
        onClose={() => setShowPublisherModal(false)}
        onSubmit={handleQuickAddPublisher}
        title="Thêm nhà xuất bản mới"
        fieldLabel="Tên nhà xuất bản"
        placeholder="Nhập tên nhà xuất bản..."
      />
    </>
  );
}
