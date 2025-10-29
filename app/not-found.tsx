"use client";

import Link from "next/link";
import { IconHome, IconArrowLeft, IconMoodSad } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 relative">
          <div className="text-[200px] font-bold gradient-primary bg-clip-text text-transparent leading-none">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconMoodSad size={80} className="text-purple-300 animate-bounce" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Oops! Trang không tồn tại
        </h1>
        
        <p className="text-2xl text-gray-600 mb-12">
          Có vẻ như bạn đã đi lạc. Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 hover:scale-105">
              <IconHome size={24} />
              Về trang chủ
            </button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-10 py-5 glass-card rounded-2xl font-bold text-xl text-gray-800 hover:shadow-xl transition-all flex items-center gap-3 hover:scale-105"
          >
            <IconArrowLeft size={24} />
            Quay lại
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/shop", label: "Cửa hàng" },
            { href: "/books", label: "Sách" },
            { href: "/cart", label: "Giỏ hàng" },
            { href: "/profile", label: "Tài khoản" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="glass-card p-4 rounded-2xl hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <p className="font-semibold text-gray-700">{link.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
