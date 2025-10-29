"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";

interface Address {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  onAddressChange: (addresses: Address[]) => void;
  userId?: string;
}

export default function AddressModal({ isOpen, onClose, addresses, onAddressChange, userId }: AddressModalProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Address>({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    isDefault: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userId) {
      try {
        const response = await fetch("/api/users/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, address: formData }),
        });
        const data = await response.json();
        onAddressChange(data.addresses);
        toast.success("Đã thêm địa chỉ");
      } catch (error) {
        toast.error("Không thể thêm địa chỉ");
      }
    } else {
      const newAddresses = [...addresses, { ...formData, _id: Date.now().toString() }];
      if (formData.isDefault) {
        newAddresses.forEach((addr, i) => {
          if (i !== newAddresses.length - 1) addr.isDefault = false;
        });
      }
      onAddressChange(newAddresses);
    }
    
    setShowForm(false);
    setFormData({ name: "", phone: "", address: "", city: "", zipCode: "", isDefault: false });
  };

  const handleSetDefault = async (index: number) => {
    const newAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    onAddressChange(newAddresses);
    
    if (userId && addresses[index]._id) {
      await fetch("/api/users/addresses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, addressId: addresses[index]._id, updates: { isDefault: true } }),
      });
    }
  };

  const handleDelete = async (index: number) => {
    if (userId && addresses[index]._id) {
      await fetch("/api/users/addresses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, addressId: addresses[index]._id }),
      });
    }
    onAddressChange(addresses.filter((_, i) => i !== index));
    toast.success("Đã xóa địa chỉ");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Địa chỉ giao hàng</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                <IconX size={24} />
              </button>
            </div>

            {!showForm ? (
              <>
                <div className="space-y-3 mb-6">
                  {addresses.map((addr, index) => (
                    <div key={addr._id || index} className={`glass-btn p-4 rounded-2xl ${addr.isDefault ? "border-2 border-purple-500" : ""}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold">{addr.name} | {addr.phone}</p>
                          <p className="text-gray-600">{addr.address}, {addr.city}, {addr.zipCode}</p>
                          {addr.isDefault && <span className="text-xs text-purple-600 font-bold">Mặc định</span>}
                        </div>
                        <div className="flex gap-2">
                          {!addr.isDefault && (
                            <button onClick={() => handleSetDefault(index)} className="text-sm text-purple-600 hover:underline">
                              Đặt mặc định
                            </button>
                          )}
                          <button onClick={() => handleDelete(index)} className="text-sm text-red-600 hover:underline">
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 glass-btn rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <IconPlus size={20} />
                  Thêm địa chỉ mới
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Họ tên *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Địa chỉ *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Thành phố *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Mã bưu điện *</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Đặt làm địa chỉ mặc định</span>
                </label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 glass-btn rounded-xl font-bold">
                    Hủy
                  </button>
                  <button type="submit" className="flex-1 py-3 gradient-primary text-white rounded-xl font-bold">
                    Lưu
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
