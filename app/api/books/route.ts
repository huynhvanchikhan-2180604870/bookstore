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
    
    // Validate required fields
    const { title, author, category, publisher, price, isbn, pages, coverImage, description } = body;
    const missing = [];
    if (!title) missing.push("title");
    if (!author) missing.push("author");
    if (!category) missing.push("category");
    if (!publisher) missing.push("publisher");
    if (!price) missing.push("price");
    if (!isbn) missing.push("isbn");
    if (!pages) missing.push("pages");
    if (!coverImage) missing.push("coverImage");
    if (!description) missing.push("description");
    
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }

    const book = await Book.create(body);
    const populated = await Book.findById(book._id)
      .populate("category")
      .populate("author")
      .populate("publisher")
      .lean();
    
    return NextResponse.json({ success: true, book: populated }, { status: 201 });
  } catch (error: any) {
    console.error("Create book error:", error);
    return NextResponse.json({ error: error.message || "Failed to create book" }, { status: 500 });
  }
}
