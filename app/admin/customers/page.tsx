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
        <div className="grid md:grid-cols-3 gap-6">
          {customers.map((customer: any, i) => (
            <motion.div key={customer._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                  {customer.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{customer.name || "N/A"}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${customer.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                    {customer.role === "admin" ? "Admin" : "Khách hàng"}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <IconMail size={18} />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="text-sm">
                  Tham gia: {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
