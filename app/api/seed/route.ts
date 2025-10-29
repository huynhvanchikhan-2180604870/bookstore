import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import Category from "@/models/Category";

export async function POST() {
  try {
    await dbConnect();

    const categories = await Category.find();
    if (categories.length === 0) {
      return NextResponse.json({ error: "No categories found" }, { status: 400 });
    }

    const sampleBooks = [
      {
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử",
        price: 89000,
        discountPrice: 69000,
        category: categories[0]._id,
        isbn: "978-1234567890",
        publisher: "NXB Tổng Hợp",
        publishDate: new Date("2020-01-01"),
        pages: 320,
        language: "Tiếng Việt",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"],
        stock: 100,
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        bestseller: true,
      },
      {
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        description: "Hành trình tìm kiếm kho báu và ý nghĩa cuộc sống",
        price: 79000,
        discountPrice: 59000,
        category: categories[0]._id,
        isbn: "978-1234567891",
        publisher: "NXB Văn Học",
        publishDate: new Date("2019-06-15"),
        pages: 280,
        language: "Tiếng Việt",
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"],
        stock: 150,
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        bestseller: true,
      },
      {
        title: "Sapiens: Lược Sử Loài Người",
        author: "Yuval Noah Harari",
        description: "Câu chuyện về sự tiến hóa của loài người",
        price: 199000,
        discountPrice: 159000,
        category: categories[0]._id,
        isbn: "978-1234567892",
        publisher: "NXB Thế Giới",
        publishDate: new Date("2021-03-20"),
        pages: 512,
        language: "Tiếng Việt",
        coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
        images: ["https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"],
        stock: 80,
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        bestseller: false,
      },
    ];

    const books = await Book.insertMany(sampleBooks);

    return NextResponse.json({ 
      success: true, 
      message: `Created ${books.length} books`,
      books 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed books" }, { status: 500 });
  }
}
