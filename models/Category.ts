import mongoose, { Schema } from "mongoose";
export function slugifyVN(input = "") {
  return String(input)
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // non-alnum -> -
    .replace(/^-+|-+$/g, "") // bỏ - ở đầu/cuối
    .replace(/-{2,}/g, "-"); // gộp ---
}
const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
