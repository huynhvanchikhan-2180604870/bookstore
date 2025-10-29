import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";
import User from "@/models/User";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();

    const [orders, books, users] = await Promise.all([
      Order.find().populate("items.bookId").lean(),
      Book.find().populate("category").lean(),
      User.find().lean(),
    ]);

    const totalRevenue = orders.reduce((sum, o: any) => sum + (o.totalAmount || 0), 0);
    
    const revenueByMonth = Array(12).fill(0);
    orders.forEach((order: any) => {
      const month = new Date(order.createdAt).getMonth();
      revenueByMonth[month] += order.totalAmount || 0;
    });

    const ordersByStatus = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const categorySales: any = {};
    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const categoryName = item.bookId?.category?.name || "Khác";
        categorySales[categoryName] = (categorySales[categoryName] || 0) + item.quantity;
      });
    });

    const bookSales: any = {};
    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        if (item.bookId?._id) {
          const bookId = item.bookId._id.toString();
          if (!bookSales[bookId]) {
            bookSales[bookId] = {
              book: item.bookId,
              quantity: 0,
            };
          }
          bookSales[bookId].quantity += item.quantity;
        }
      });
    });

    const topBooks = Object.values(bookSales)
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 5);

    return NextResponse.json({
      totalBooks: books.length,
      totalOrders: orders.length,
      totalCustomers: users.length,
      totalRevenue,
      revenueByMonth: revenueByMonth.map(r => (r / 1000000).toFixed(1)),
      ordersByStatus,
      categorySales,
      topBooks,
      recentOrders: orders.slice(0, 5),
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
