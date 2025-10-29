import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
    publishDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    language: { type: String, default: "Vietnamese" },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
