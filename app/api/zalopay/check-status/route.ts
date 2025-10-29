import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const config = {
  app_id: "554",
  key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
  key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
};

export async function GET(request: NextRequest) {
  try {
    const apptransid = request.nextUrl.searchParams.get("apptransid");
    
    if (!apptransid) {
      return NextResponse.json({ error: "Missing apptransid" }, { status: 400 });
    }

    const postData: any = {
      app_id: config.app_id,
      app_trans_id: apptransid,
    };

    const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
    postData.mac = crypto.createHmac("sha256", config.key1).update(data).digest("hex");

    const result = await axios.post(
      "https://sb-openapi.zalopay.vn/v2/query",
      new URLSearchParams(postData).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (result.data.return_code === 1) {
      await dbConnect();
      await Order.findOneAndUpdate(
        { transactionId: apptransid },
        {
          paymentStatus: "paid",
          status: "confirmed",
        }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Check status error:", error);
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 });
  }
}
