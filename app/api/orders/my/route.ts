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
    
    const userId = request.nextUrl.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Debug: Check all orders
    const allOrders = await (Order as any).find({}).lean();
    console.log(`Total orders in DB: ${allOrders.length}`);
    if (allOrders.length > 0) {
      console.log(`Sample order userId:`, allOrders[0].userId);
      console.log(`Requested userId:`, userId);
    }

    const orders = await (Order as any).find({ userId })
      .populate("items.bookId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`Found ${orders.length} orders for userId: ${userId}`);
      
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
