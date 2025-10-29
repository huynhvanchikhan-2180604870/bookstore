import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Publisher || mongoose.model("Publisher", publisherSchema);
