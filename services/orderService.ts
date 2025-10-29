import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const orderService = {
  getOrders: async (token?: string) => {
    const response = await axios.get(`${API_URL}/orders`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  getOrderById: async (id: string, token?: string) => {
    const response = await axios.get(`${API_URL}/orders/${id}`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  createOrder: async (data: any, token?: string) => {
    const response = await axios.post(`${API_URL}/orders`, data, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string, token?: string) => {
    const response = await axios.patch(
      `${API_URL}/orders/${id}`,
      { status },
      token ? {
        headers: { Authorization: `Bearer ${token}` },
      } : {}
    );
    return response.data;
  },
};
