"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
  title: string;
  fieldLabel: string;
  placeholder: string;
}

export default function QuickAddModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fieldLabel,
  placeholder,
}: QuickAddModalProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(name.trim());
      setName("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    {fieldLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting || !name.trim()}
                    className="flex-1 py-4 gradient-primary text-white rounded-2xl font-bold shadow-xl disabled:opacity-50"
                  >
                    {submitting ? "Đang thêm..." : "Thêm"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="px-8 py-4 glass-btn rounded-2xl font-bold"
                  >
                    Hủy
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
