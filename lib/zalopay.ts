import axios from "axios";
import crypto from "crypto";

const config = {
  app_id: "554",
  key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
  key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export const createZaloPayOrder = async (
  amount: number,
  orderId: string,
  description: string
) => {
  const embed_data = {
    redirecturl: "https://bookstore-rouge-kappa.vercel.app/checkout/success",
  };
  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const app_trans_id = `${String(new Date().getFullYear()).slice(-2)}${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}${String(new Date().getDate()).padStart(
    2,
    "0"
  )}_${transID}`;

  const order: any = {
    app_id: config.app_id,
    app_trans_id: app_trans_id,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    description: description,
  };

  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = crypto
    .createHmac("sha256", config.key1)
    .update(data)
    .digest("hex");

  const params = new URLSearchParams(order).toString();
  console.log("ZaloPay params:", params);

  try {
    const result = await axios.post(config.endpoint, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log("ZaloPay response:", result.data);
    return { ...result.data, app_trans_id };
  } catch (error: any) {
    console.error("ZaloPay API error:", error.response?.data || error.message);
    throw error;
  }
};
