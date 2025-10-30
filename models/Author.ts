import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

// Virtual for backward compatibility
authorSchema.virtual('displayName').get(function() {
  return this.fullName || this.name;
});

authorSchema.set('toJSON', { virtuals: true });
authorSchema.set('toObject', { virtuals: true });

export default mongoose.models.Author || mongoose.model("Author", authorSchema);
