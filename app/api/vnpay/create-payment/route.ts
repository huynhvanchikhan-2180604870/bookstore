import { NextRequest, NextResponse } from "next/server";
import { createVNPayPaymentUrl } from "@/lib/vnpay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderInfo } = body;
    
    const orderId = `${Date.now()}`;
    const ipAddr = "127.0.0.1";

    console.log("Creating VNPay payment:", { orderId, amount, orderInfo, ipAddr });
    const paymentUrl = createVNPayPaymentUrl(orderId, amount, orderInfo, ipAddr);
    console.log("Payment URL:", paymentUrl);

    return NextResponse.json({ paymentUrl, orderId });
  } catch (error) {
    console.error("VNPay error:", error);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
