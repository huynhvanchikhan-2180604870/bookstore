import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    return NextResponse.json(cart || { items: [], totalAmount: 0 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId, quantity, price } = await request.json();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ bookId, quantity, price }],
        totalAmount: price * quantity,
      });
    } else {
      const existingItem = cart.items.find((item: any) => item.bookId.toString() === bookId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity, price });
      }
      
      cart.totalAmount = cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
      await cart.save();
    }

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
