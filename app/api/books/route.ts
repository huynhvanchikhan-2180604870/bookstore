import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import Author from "@/models/Author";
import Publisher from "@/models/Publisher";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    Author;
    Publisher;
    Category;

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const categoryName = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (category) {
        query.category = category._id;
      }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const books = await Book.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("category")
      .populate("author")
      .populate("publisher")
      .sort({ createdAt: -1 })
      .lean();

    const total = await Book.countDocuments(query);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Books fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const book = await Book.create(body);
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
