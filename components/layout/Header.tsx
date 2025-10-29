"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import {
  IconBook,
  IconHeart,
  IconLogout,
  IconShoppingCart,
  IconUser,
  IconShield,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout, getTotalItems } = useStore();
  const totalItems = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 mt-2 me-5 ms-5 rounded-3xl left-0 right-0 z-50 glass-card border-b border-white/20 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <IconBook className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                BookStore
              </span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex gap-2">
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/shop", label: "Cửa hàng" },
              { href: "/books", label: "Sách" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 glass-btn rounded-xl"
            >
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 glass-btn rounded-xl"
              >
                <IconShoppingCart className="text-gray-700 w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {totalItems}
                  </span>
                )}
              </motion.button>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link href="/profile/wishlist">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 glass-btn rounded-xl">
                      <IconHeart className="text-gray-700 w-6 h-6" />
                    </motion.button>
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 glass-btn rounded-xl">
                        <IconShield className="text-orange-600 w-6 h-6" />
                      </motion.button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 glass-btn rounded-xl">
                      <IconUser className="text-gray-700 w-6 h-6" />
                    </motion.button>
                  </Link>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={logout} className="p-2 glass-btn rounded-xl">
                    <IconLogout className="text-red-500 w-6 h-6" />
                  </motion.button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-2 font-semibold text-gray-700">
                      Đăng nhập
                    </motion.button>
                  </Link>
                  <Link href="/auth/signup">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="px-8 py-2 gradient-primary text-white rounded-xl font-semibold shadow-lg">
                      Đăng ký
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed top-16 right-0 bottom-0 w-64 z-40 glass-card backdrop-blur-xl border-l border-white/20 overflow-y-auto"
          >
            <nav className="p-4 space-y-2">
              {[
                { href: "/", label: "Trang chủ", icon: IconBook },
                { href: "/shop", label: "Cửa hàng", icon: IconShoppingCart },
                { href: "/books", label: "Sách", icon: IconBook },
                { href: "/profile/wishlist", label: "Yêu thích", icon: IconHeart },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-semibold">{item.label}</span>
                  </motion.div>
                </Link>
              ))}

              {user?.role === "admin" && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <motion.div whileTap={{ scale: 0.95 }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-orange-600 hover:bg-white/50 transition-all">
                    <IconShield size={20} />
                    <span className="font-semibold">Admin</span>
                  </motion.div>
                </Link>
              )}

              <div className="border-t border-white/20 my-4" />

              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <motion.div whileTap={{ scale: 0.95 }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all">
                      <IconUser size={20} />
                      <span className="font-semibold">Tài khoản</span>
                    </motion.div>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                  >
                    <IconLogout size={20} />
                    <span className="font-semibold">Đăng xuất</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button whileTap={{ scale: 0.95 }} className="w-full px-4 py-3 glass-btn rounded-xl font-semibold text-gray-700">
                      Đăng nhập
                    </motion.button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button whileTap={{ scale: 0.95 }} className="w-full px-4 py-3 gradient-primary text-white rounded-xl font-semibold shadow-lg mt-2">
                      Đăng ký
                    </motion.button>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
