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
