import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const cartService = {
  getCart: async (token?: string) => {
    const response = await axios.get(`${API_URL}/cart`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  addToCart: async (data: { bookId: string; quantity: number; price: number }, token?: string) => {
    const response = await axios.post(`${API_URL}/cart`, data, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  updateCart: async (data: any, token?: string) => {
    const response = await axios.put(`${API_URL}/cart`, data, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  clearCart: async (token?: string) => {
    const response = await axios.delete(`${API_URL}/cart`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },
};
