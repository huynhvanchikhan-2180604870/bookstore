import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const paymentService = {
  createPaymentIntent: async (amount: number, token: string) => {
    const response = await axios.post(
      `${API_URL}/payment`,
      { amount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};
