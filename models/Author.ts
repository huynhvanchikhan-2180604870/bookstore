import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Author || mongoose.model("Author", authorSchema);
