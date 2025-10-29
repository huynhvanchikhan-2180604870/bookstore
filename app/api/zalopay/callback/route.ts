import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const key2 = "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: dataStr, mac } = body;

    const reqMac = crypto.createHmac("sha256", key2).update(dataStr).digest("hex");

    if (reqMac !== mac) {
      return NextResponse.json({ return_code: -1, return_message: "mac not equal" });
    }

    const dataJson = JSON.parse(dataStr);
    const apptransid = dataJson.app_trans_id;

    await dbConnect();
    await Order.findOneAndUpdate(
      { transactionId: apptransid },
      {
        paymentStatus: "paid",
        status: "confirmed",
      }
    );

    return NextResponse.json({ return_code: 1, return_message: "success" });
  } catch (error) {
    console.error("ZaloPay callback error:", error);
    return NextResponse.json({ return_code: 0, return_message: "error" });
  }
}
