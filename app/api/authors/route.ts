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

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const author = await Author.create(body);
    return NextResponse.json({ ok: true, data: author }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
  }
}
