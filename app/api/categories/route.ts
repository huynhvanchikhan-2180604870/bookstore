import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

function slugifyVN(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({});
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request /** @type {NextRequest} */) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, description, image, parentId } = body || {};
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: "Missing 'name'" },
        { status: 400 }
      );
    }

    // Tạo slug từ name (hoặc từ slug người dùng gửi nếu có)
    let baseSlug = body.slug ? slugifyVN(body.slug) : slugifyVN(name);
    if (!baseSlug) baseSlug = "category";

    // Đảm bảo slug là unique: thêm -2, -3,... nếu trùng
    let finalSlug = baseSlug;
    let i = 2;
    while (await Category.exists({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${i++}`;
      if (i > 200) {
        return NextResponse.json(
          { ok: false, error: "Unable to generate unique slug" },
          { status: 500 }
        );
      }
    }

    // Nếu có parentId, kiểm tra tồn tại & hợp lệ
    let parent = null;
    if (parentId) {
      try {
        parent = await Category.findById(parentId).lean();
        if (!parent) {
          return NextResponse.json(
            { ok: false, error: "parentId not found" },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { ok: false, error: "Invalid parentId" },
          { status: 400 }
        );
      }
    }

    const doc = await Category.create({
      name: name.trim(),
      slug: finalSlug,
      description,
      image,
      parentId: parent?._id || undefined,
    });

    return NextResponse.json({ ok: true, data: doc }, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories error:", error);

    // Duplicate key (slug)
    if (error?.code === 11000) {
      return NextResponse.json(
        { ok: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    // Validation error
    if (error?.name === "ValidationError") {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}
