import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const bookService = {
  getAll: async (params?: { page?: number; limit?: number; category?: string; search?: string }) => {
    const response = await axios.get(`${API_URL}/books`, { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  },

  create: async (data: any, token?: string) => {
    const response = await axios.post(`${API_URL}/books`, data, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  update: async (id: string, data: any, token?: string) => {
    const response = await axios.put(`${API_URL}/books/${id}`, data, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  delete: async (id: string, token?: string) => {
    const response = await axios.delete(`${API_URL}/books/${id}`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },
};
