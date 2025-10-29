import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Book from "@/models/Book";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    User;
    Book;
    
    const isAdmin = request.nextUrl.searchParams.get("admin");
    
    if (isAdmin !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const orders = await Order.find({})
      .populate("items.bookId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { items, totalAmount, shippingAddress, paymentMethod, paymentStatus, userId, transactionId } = body;

    const order = await Order.create({
      userId: userId || null,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "cod",
      paymentStatus: paymentStatus || "pending",
      status: "pending",
      transactionId: transactionId || undefined,
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
