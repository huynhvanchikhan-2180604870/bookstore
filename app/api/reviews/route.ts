import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";
import User from "@/models/User";
import Book from "@/models/Book";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const bookId = request.nextUrl.searchParams.get("bookId");
    
    if (!bookId) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = await Review.find({ bookId }).sort({ createdAt: -1 }).lean();
    
    const populatedReviews = await Promise.all(
      reviews.map(async (review: any) => {
        try {
          const user = await User.findById(review.userId).select("name avatar").lean();
          return { ...review, userId: user || { name: "Anonymous", avatar: "" } };
        } catch {
          return { ...review, userId: { name: "Anonymous", avatar: "" } };
        }
      })
    );
    
    return NextResponse.json({ reviews: populatedReviews });
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    if (!body.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const review = await Review.create(body);
    
    const reviews = await Review.find({ bookId: body.bookId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(body.bookId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
