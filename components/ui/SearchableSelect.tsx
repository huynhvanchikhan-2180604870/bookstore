"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { _id: string; name?: string; fullName?: string; title?: string };

interface SearchableSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  onQuickAdd?: () => void;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
}

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  onQuickAdd,
  placeholder = "-- Chọn --",
  required = false,
  loading = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o._id === value);
  const displayName = selectedOption
    ? selectedOption.fullName || selectedOption.name || selectedOption.title
    : placeholder;

  const filtered = options.filter((o) => {
    const name = o.fullName || o.name || o.title || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-lg font-semibold text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 glass-btn rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {loading ? "Đang tải..." : displayName}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 glass-card rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-6 py-4 text-gray-500 text-center">Không tìm thấy</div>
              ) : (
                filtered.map((option) => {
                  const name = option.fullName || option.name || option.title;
                  return (
                    <button
                      key={option._id}
                      type="button"
                      onClick={() => {
                        onChange(option._id);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-6 py-3 text-left hover:bg-purple-50 transition-colors ${
                        value === option._id ? "bg-purple-100 font-semibold" : ""
                      }`}
                    >
                      {name}
                    </button>
                  );
                })
              )}
            </div>

            {onQuickAdd && (
              <div className="p-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onQuickAdd();
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                >
                  + Thêm mới
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
