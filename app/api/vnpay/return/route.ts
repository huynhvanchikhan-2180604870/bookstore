import { NextRequest, NextResponse } from "next/server";
import { verifyVNPayReturn } from "@/lib/vnpay";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vnp_Params: any = {};
    
    searchParams.forEach((value, key) => {
      vnp_Params[key] = value;
    });

    const isValid = verifyVNPayReturn(vnp_Params);

    if (!isValid) {
      return NextResponse.redirect(new URL("/checkout/failed", request.url));
    }

    const orderId = vnp_Params.vnp_TxnRef;
    const responseCode = vnp_Params.vnp_ResponseCode;

    await dbConnect();

    if (responseCode === "00") {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
        status: "processing",
      });
      return NextResponse.redirect(new URL("/checkout/success", request.url));
    } else {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
      });
      return NextResponse.redirect(new URL("/checkout/failed", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/checkout/failed", request.url));
  }
}
