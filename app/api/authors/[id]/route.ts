import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Author from "@/models/Author";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const author = await Author.findByIdAndUpdate(id, body, { new: true });
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: author });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, message: "Author deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 });
  }
}
