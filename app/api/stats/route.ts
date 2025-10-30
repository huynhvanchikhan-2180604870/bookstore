import dbConnect from "@/lib/mongodb";
import "@/models/Author";
import Book from "@/models/Book";
import "@/models/Category";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await dbConnect();

    const [orders, books, users] = await Promise.all([
      Order.find()
        .populate({
          path: "items.bookId",
          populate: [{ path: "category" }, { path: "author" }],
        })
        .lean(),
      Book.find().populate("category").lean(),
      User.find().lean(),
    ]);

    const totalRevenue = orders.reduce(
      (sum: number, o: any) => sum + (o.totalAmount || 0),
      0
    );

    // 12 tháng mặc định 0
    const revenueByMonthNum: number[] = Array.from({ length: 12 }, () => 0);
    for (const order of orders) {
      const created = order?.createdAt ? new Date(order.createdAt) : null;
      if (!created || Number.isNaN(created.getTime())) continue;
      const m = created.getMonth(); // 0..11
      revenueByMonthNum[m] += order.totalAmount || 0;
    }

    const ordersByStatus = orders.reduce(
      (acc: Record<string, number>, order: any) => {
        const key = order?.status || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {}
    );

    const categorySales: Record<string, number> = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        const catName =
          item?.bookId?.category?.name ??
          (typeof item?.bookId?.category === "string" ? "Khác" : "Khác");
        categorySales[catName] =
          (categorySales[catName] || 0) + (item?.quantity || 0);
      }
    }

    const bookSales: Record<string, { book: any; quantity: number }> = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        const b = item?.bookId;
        if (!b?._id) continue;
        const id = String(b._id);
        if (!bookSales[id]) bookSales[id] = { book: b, quantity: 0 };
        bookSales[id].quantity += item?.quantity || 0;
      }
    }

    const topBooks = Object.values(bookSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const recentOrders = [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return NextResponse.json({
      totalBooks: books.length,
      totalOrders: orders.length,
      totalCustomers: users.length,
      totalRevenue,
      // gửi dạng số (triệu) để FE vẽ chart trực tiếp
      revenueByMonth: revenueByMonthNum.map((v) =>
        Number((v / 1_000_000).toFixed(2))
      ),
      ordersByStatus,
      categorySales,
      topBooks,
      recentOrders,
    });
  } catch (error) {
    console.error("Stats error:", error);
    // Trả skeleton an toàn để FE không sập nếu có lỗi
    return NextResponse.json(
      {
        totalBooks: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        revenueByMonth: Array.from({ length: 12 }, () => 0),
        ordersByStatus: {},
        categorySales: {},
        topBooks: [],
        recentOrders: [],
        error: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
