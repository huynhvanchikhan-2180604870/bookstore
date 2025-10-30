import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Publisher from "@/models/Publisher";

export async function GET() {
  try {
    await dbConnect();
    const publishers = await Publisher.find({});
    return NextResponse.json({ publishers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch publishers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const publisher = await Publisher.create(body);
    return NextResponse.json({ ok: true, data: publisher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create publisher" }, { status: 500 });
  }
}
