import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const userService = {
  signup: async (data: { email: string; password: string; name: string }) => {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  },

  signin: async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/signin`, data);
    return response.data;
  },

  getProfile: async (token?: string) => {
    const response = await axios.get(`${API_URL}/users/me`, token ? {
      headers: { Authorization: `Bearer ${token}` },
    } : {});
    return response.data;
  },
};
