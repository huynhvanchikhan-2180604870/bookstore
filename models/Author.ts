import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    name: { type: String },
    bio: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

// Ensure at least one name field is provided
authorSchema.pre('validate', function(next) {
  if (!this.fullName && !this.name) {
    this.invalidate('fullName', 'Either fullName or name is required');
  }
  // Auto-populate name from fullName if not provided
  if (this.fullName && !this.name) {
    this.name = this.fullName;
  }
  // Auto-populate fullName from name if not provided
  if (this.name && !this.fullName) {
    this.fullName = this.name;
  }
  next();
});

// Virtual for backward compatibility
authorSchema.virtual('displayName').get(function() {
  return this.fullName || this.name;
});

authorSchema.set('toJSON', { virtuals: true });
authorSchema.set('toObject', { virtuals: true });

export default mongoose.models.Author || mongoose.model("Author", authorSchema);
