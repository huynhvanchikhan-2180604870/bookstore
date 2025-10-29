import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String, enum: ["zalopay", "cod"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      zipCode: String,
    },
    trackingNumber: String,
    transactionId: String,
    cancelReason: String,
  },
  { timestamps: true }
);

delete mongoose.models.Order;
export default mongoose.model("Order", OrderSchema);
