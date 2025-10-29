import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  isbn: z.string().min(1),
  publisher: z.string().min(1),
  pages: z.number().positive(),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    bookId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  totalAmount: z.number().positive(),
  paymentMethod: z.enum(["stripe", "paypal", "cod"]),
});
