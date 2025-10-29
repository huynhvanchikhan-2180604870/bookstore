"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUsers, IconMail, IconPhone } from "@tabler/icons-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setCustomers(data.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2">
          <span className="gradient-primary bg-clip-text text-transparent">Quản lý khách hàng</span>
        </h1>
        <p className="text-xl text-gray-600">Tổng số: {customers.length} khách hàng</p>
      </div>

      {loading ? (
        <div className="glass-card p-20 rounded-3xl animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      ) : (
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Tên</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Vai trò</th>
                  <th className="px-6 py-4 text-left font-bold">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer: any, index) => (
                  <motion.tr key={customer._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border-t border-gray-200 hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">{customer.name?.charAt(0) || "U"}</div>
                        <span className="font-semibold text-gray-900">{customer.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-2 rounded-xl font-semibold ${customer.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>{customer.role === "admin" ? "Admin" : "Khách hàng"}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(customer.createdAt).toLocaleDateString("vi-VN")}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
