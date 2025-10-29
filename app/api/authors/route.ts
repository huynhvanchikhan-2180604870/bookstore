import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Author from "@/models/Author";

export async function GET() {
  try {
    await dbConnect();
    const authors = await Author.find({});
    return NextResponse.json({ authors });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}
