import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Publisher from "@/models/Publisher";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const publisher = await Publisher.findByIdAndUpdate(id, body, { new: true });
    if (!publisher) {
      return NextResponse.json({ error: "Publisher not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: publisher });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update publisher" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const publisher = await Publisher.findByIdAndDelete(id);
    if (!publisher) {
      return NextResponse.json({ error: "Publisher not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, message: "Publisher deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete publisher" }, { status: 500 });
  }
}
