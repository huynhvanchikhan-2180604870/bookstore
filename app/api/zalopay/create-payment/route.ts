import { NextRequest, NextResponse } from "next/server";
import { createZaloPayOrder } from "@/lib/zalopay";

export async function POST(request: NextRequest) {
  try {
    const { amount, orderInfo } = await request.json();
    const orderId = `${Date.now()}`;

    console.log("Creating ZaloPay order:", { amount, orderInfo, orderId });
    const result = await createZaloPayOrder(amount, orderId, orderInfo);
    console.log("ZaloPay result:", result);

    if (result.return_code === 1) {
      return NextResponse.json({ paymentUrl: result.order_url, apptransid: result.app_trans_id });
    } else {
      console.error("ZaloPay error:", result);
      return NextResponse.json({ error: result.return_message || "Payment failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("ZaloPay error:", error.response?.data || error.message);
    return NextResponse.json({ error: error.message || "Failed to create payment" }, { status: 500 });
  }
}
