"use client";

import Link from "next/link";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMail, IconPhone, IconMapPin, IconBook } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="glass-card border-t border-white/20 m-3 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <IconBook size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">BookStore</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nơi tri thức hội tụ, nơi đam mê bắt đầu
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <IconMapPin size={20} className="text-purple-600" />
                <span>123 Đường ABC, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <IconPhone size={20} className="text-purple-600" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <IconMail size={20} className="text-purple-600" />
                <span>support@bookstore.vn</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Công ty</h4>
            <ul className="space-y-3">
              {["Về chúng tôi", "Liên hệ", "Tuyển dụng"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Hỗ trợ</h4>
            <ul className="space-y-3">
              {["Hướng dẫn mua hàng", "Chính sách đổi trả", "Câu hỏi thường gặp"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Pháp lý</h4>
            <ul className="space-y-3">
              {["Điều khoản sử dụng", "Chính sách bảo mật", "Thanh toán"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600">© 2025 BookStore. All rights reserved.</p>
          <div className="flex gap-4">
            {[IconBrandFacebook, IconBrandInstagram, IconBrandTwitter].map((Icon, i) => (
              <Link key={i} href="#">
                <button className="w-12 h-12 rounded-full glass-btn flex items-center justify-center hover:scale-110 transition-transform">
                  <Icon size={22} className="text-gray-700" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
