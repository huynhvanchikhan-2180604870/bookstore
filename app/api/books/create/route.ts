import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import Category from "@/models/Category";
import Author from "@/models/Author";
import Publisher from "@/models/Publisher";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title, authorName, description, price, discountPrice, categoryName, isbn, publisherName, publishDate, pages, language, coverImage, images, stock, featured, bestseller } = body;

    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({ name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, '-') });
    }

    let author = await Author.findOne({ name: authorName });
    if (!author) {
      author = await Author.create({ name: authorName });
    }

    let publisher = await Publisher.findOne({ name: publisherName });
    if (!publisher) {
      publisher = await Publisher.create({ name: publisherName });
    }

    const book = await Book.create({
      title,
      author: author._id,
      description,
      price,
      discountPrice,
      category: category._id,
      isbn,
      publisher: publisher._id,
      publishDate,
      pages,
      language: language || "Tiếng Việt",
      coverImage,
      images: images || [coverImage],
      stock: stock || 100,
      rating: 0,
      reviewCount: 0,
      featured: featured || false,
      bestseller: bestseller || false,
    });

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (error: any) {
    console.error("Create book error:", error);
    return NextResponse.json({ error: error.message || "Failed to create book" }, { status: 500 });
  }
}
