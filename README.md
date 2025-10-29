# Cấu trúc Thư Mục Dự án Next.js 15 - Bookstore với Liquid Glass UI

```
bookstore-nextjs/
├── public/
│   ├── images/
│   │   ├── books/
│   │   ├── authors/
│   │   ├── categories/
│   │   └── hero/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── books/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   └── wishlist/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── books/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── edit/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   ├── customers/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── books/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── categories/
│   │       │   └── route.ts
│   │       ├── cart/
│   │       │   └── route.ts
│   │       ├── orders/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── users/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── auth/
│   │       │   ├── signin/
│   │       │   │   └── route.ts
│   │       │   ├── signup/
│   │       │   │   └── route.ts
│   │       │   └── signout/
│   │       │       └── route.ts
│   │       ├── reviews/
│   │       │   └── route.ts
│   │       ├── wishlist/
│   │       │   └── route.ts
│   │       └── payment/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── GlassCard.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── books/
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookGrid.tsx
│   │   │   ├── BookList.tsx
│   │   │   ├── BookDetails.tsx
│   │   │   ├── BookFilters.tsx
│   │   │   └── BookSearch.tsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartDrawer.tsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── ShippingForm.tsx
│   │   │   └── PaymentForm.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── Charts.tsx
│   │   │
│   │   ├── reviews/
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   └── RatingStars.tsx
│   │   │
│   │   └── common/
│   │       ├── Breadcrumb.tsx
│   │       ├── Pagination.tsx
│   │       ├── SearchBar.tsx
│   │       ├── CategoryMenu.tsx
│   │       └── LoadingState.tsx
│   │
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── models/
│   │   ├── Book.ts
│   │   ├── User.ts
│   │   ├── Order.ts
│   │   ├── Review.ts
│   │   ├── Category.ts
│   │   └── Cart.ts
│   │
│   ├── services/
│   │   ├── bookService.ts
│   │   ├── userService.ts
│   │   ├── orderService.ts
│   │   ├── cartService.ts
│   │   └── paymentService.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useBooks.ts
│   │   ├── useOrders.ts
│   │   └── useToast.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── types/
│   │   ├── book.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   ├── cart.ts
│   │   └── index.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   │
│   └── styles/
│       ├── liquid-glass.css
│       └── animations.css
│
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 📋 Chi tiết cấu trúc

### **1. Frontend (App Directory)**

- **`app/`**: Route-based structure với Next.js 15 App Router
- **`components/`**: Components tái sử dụng, phân chia theo chức năng
- **`styles/`**: CSS tùy chỉnh cho liquid glass effects

### **2. Backend (API Routes)**

- **`app/api/`**: RESTful API endpoints
- **`services/`**: Business logic layer
- **`models/`**: MongoDB schemas với Mongoose
- **`middleware/`**: Authentication, validation, error handling

### **3. Shared**

- **`lib/`**: Utilities, helpers, database connection
- **`types/`**: TypeScript type definitions
- **`hooks/`**: Custom React hooks
- **`contexts/`**: React Context providers

## 🎨 Liquid Glass UI Theme

**File: `src/styles/liquid-glass.css`**

```css
/* Backdrop blur effects */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Liquid animations */
.liquid-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

**File: `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "liquid-float": "liquid-float 3s ease-in-out infinite",
        "glass-shimmer": "glass-shimmer 2s linear infinite",
      },
      keyframes: {
        "liquid-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glass-shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Liquid Glass CSS
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js / Custom JWT
- **State Management**: React Context API + Custom Hooks
- **Form Handling**: React Hook Form + Zod validation
- **Payment**: Stripe / PayPal integration

## 📦 Key Dependencies

**File: `package.json`**

```json
{
  "name": "bookstore-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "mongodb": "^6.0.0",
    "mongoose": "^8.0.0",
    "tailwindcss": "^3.4.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.49.0",
    "stripe": "^14.0.0",
    "@hookform/resolvers": "^3.3.0",
    "axios": "^1.6.0",
    "date-fns": "^3.0.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "15.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8"
  }
}
```

## 🚀 Features

### **Customer Features**

- ✅ Browse books với filters (category, price, rating)
- ✅ Book details với reviews
- ✅ Shopping cart với real-time updates
- ✅ Wishlist functionality
- ✅ Order tracking
- ✅ User profile management
- ✅ Search với autocomplete
- ✅ Product recommendations

### **Admin Features**

- ✅ Dashboard với analytics
- ✅ Book management (CRUD)
- ✅ Order management
- ✅ Customer management
- ✅ Sales reports
- ✅ Inventory tracking
- ✅ Category management

### **UI/UX**

- ✅ Liquid glass morphism design
- ✅ Responsive layout (mobile-first)
- ✅ Smooth animations & transitions
- ✅ Loading states & skeletons
- ✅ Toast notifications
- ✅ Dark mode support
- ✅ Accessibility (WCAG 2.1)

## 🔐 Environment Variables

**File: `.env.example`**

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore

# Authentication
JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRES_IN=7d
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Payment
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Other
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📝 API Routes Structure

### **Books API**

```
GET    /api/books              - Lấy danh sách sách (với pagination, filters)
GET    /api/books/[id]         - Chi tiết sách
POST   /api/books              - Tạo sách mới (admin only)
PUT    /api/books/[id]         - Cập nhật sách (admin only)
DELETE /api/books/[id]         - Xóa sách (admin only)
```

### **Orders API**

```
GET    /api/orders             - Lấy danh sách đơn hàng (user's orders)
POST   /api/orders             - Tạo đơn hàng mới
GET    /api/orders/[id]        - Chi tiết đơn hàng
PATCH  /api/orders/[id]        - Cập nhật trạng thái (admin only)
```

### **Cart API**

```
GET    /api/cart               - Lấy giỏ hàng
POST   /api/cart               - Thêm vào giỏ
PUT    /api/cart               - Cập nhật số lượng
DELETE /api/cart               - Xóa khỏi giỏ
```

### **Users API**

```
GET    /api/users              - Lấy danh sách users (admin only)
GET    /api/users/[id]         - Chi tiết user
PUT    /api/users/[id]         - Cập nhật profile
DELETE /api/users/[id]         - Xóa user (admin only)
```

### **Auth API**

```
POST   /api/auth/signin        - Đăng nhập
POST   /api/auth/signup        - Đăng ký
POST   /api/auth/signout       - Đăng xuất
```

### **Reviews API**

```
GET    /api/reviews            - Lấy reviews (by book_id)
POST   /api/reviews            - Tạo review mới
PUT    /api/reviews/[id]       - Cập nhật review
DELETE /api/reviews/[id]       - Xóa review
```

### **Categories API**

```
GET    /api/categories         - Lấy danh sách categories
POST   /api/categories         - Tạo category (admin only)
PUT    /api/categories/[id]    - Cập nhật category (admin only)
DELETE /api/categories/[id]    - Xóa category (admin only)
```

### **Payment API**

```
POST   /api/payment            - Tạo payment intent (Stripe)
```

### **Wishlist API**

```
GET    /api/wishlist           - Lấy wishlist
POST   /api/wishlist           - Thêm vào wishlist
DELETE /api/wishlist           - Xóa khỏi wishlist
```

## 🗄️ Database Schema (MongoDB)

### **Book Model**

```typescript
{
  _id: ObjectId,
  title: string,
  author: string,
  description: string,
  price: number,
  discountPrice: number,
  category: ObjectId, // ref: Category
  isbn: string,
  publisher: string,
  publishDate: Date,
  pages: number,
  language: string,
  coverImage: string,
  images: string[],
  stock: number,
  rating: number,
  reviewCount: number,
  featured: boolean,
  bestseller: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **User Model**

```typescript
{
  _id: ObjectId,
  email: string,
  password: string, // hashed
  name: string,
  avatar: string,
  role: 'customer' | 'admin',
  phone: string,
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  wishlist: ObjectId[], // ref: Book
  createdAt: Date,
  updatedAt: Date
}
```

### **Order Model**

```typescript
{
  _id: ObjectId,
  userId: ObjectId, // ref: User
  items: [{
    bookId: ObjectId, // ref: Book
    quantity: number,
    price: number
  }],
  totalAmount: number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  paymentMethod: 'stripe' | 'paypal' | 'cod',
  paymentStatus: 'pending' | 'paid' | 'failed',
  shippingAddress: {
    name: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  trackingNumber: string,
  createdAt: Date,
  updatedAt: Date
}
```

### **Review Model**

```typescript
{
  _id: ObjectId,
  bookId: ObjectId, // ref: Book
  userId: ObjectId, // ref: User
  rating: number, // 1-5
  comment: string,
  helpful: number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Category Model**

```typescript
{
  _id: ObjectId,
  name: string,
  slug: string,
  description: string,
  image: string,
  parentId: ObjectId, // ref: Category (for subcategories)
  createdAt: Date,
  updatedAt: Date
}
```

### **Cart Model**

```typescript
{
  _id: ObjectId,
  userId: ObjectId, // ref: User
  items: [{
    bookId: ObjectId, // ref: Book
    quantity: number,
    price: number
  }],
  totalAmount: number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Best Practices

### **1. File Organization**

- Group by feature, not by type
- Keep related files close together
- Use index files for cleaner imports

### **2. TypeScript**

- Strict mode enabled
- Proper typing for all functions
- Use interfaces for data structures
- Avoid `any` type

### **3. API Design**

- RESTful conventions
- Proper HTTP status codes
- Consistent error responses
- Request validation with Zod

### **4. Error Handling**

- Centralized error middleware
- Try-catch blocks for async operations
- User-friendly error messages
- Logging for debugging

### **5. Security**

- Input validation on all endpoints
- Authentication & authorization
- Rate limiting
- CORS configuration
- SQL injection prevention (using Mongoose)
- XSS protection

### **6. Performance**

- Image optimization (Next.js Image)
- Lazy loading components
- Database indexing
- Caching strategies (Redis optional)
- Code splitting

### **7. SEO**

- Metadata for all pages
- Sitemap generation
- Structured data (JSON-LD)
- Open Graph tags
- Canonical URLs

## 🚦 Getting Started

### **1. Installation**

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local với thông tin của bạn
```

### **2. Database Setup**

```bash
# Create MongoDB database
# Update MONGODB_URI in .env.local

# Run seed data (optional)
npm run seed
```

### **3. Run Development Server**

```bash
npm run dev
# Open http://localhost:3000
```

### **4. Build for Production**

```bash
npm run build
npm run start
```

## 📚 Code Examples

### **Example: GlassCard Component**

```typescript
// src/components/ui/GlassCard.tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        glass-card rounded-xl p-6
        ${hover ? "liquid-hover" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

### **Example: MongoDB Connection**

```typescript
// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

### **Example: Book API Route**

```typescript
// src/app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");

    const query = category ? { category } : {};

    const books = await Book.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("category")
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Check admin authentication here

    const body = await request.json();
    const book = await Book.create(body);

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
```

## 🎨 Liquid Glass Design Tokens

```css
/* Color Palette */
--glass-bg-light: rgba(255, 255, 255, 0.1);
--glass-bg-dark: rgba(0, 0, 0, 0.2);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: rgba(31, 38, 135, 0.37);

/* Blur Values */
--blur-sm: 4px;
--blur-md: 10px;
--blur-lg: 20px;

/* Animations */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px'  // Extra large
}
```

## 🔍 SEO Configuration

```typescript
// src/app/layout.tsx
export const metadata = {
  title: "BookStore - Your Online Book Shopping Destination",
  description: "Discover thousands of books across all genres...",
  keywords: "books, online bookstore, buy books, ebooks",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "BookStore",
    description: "Your Online Book Shopping Destination",
    type: "website",
    locale: "vi_VN",
    url: "https://yourdomain.com",
    siteName: "BookStore",
  },
};
```

---

## 📞 Support & Documentation

- **Official Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Mongoose Docs**: https://mongoosejs.com/docs

---

**Cấu trúc này đã sẵn sàng cho production, scalable và maintainable!** 🚀

**Version**: 1.0.0  
**Last Updated**: October 2025  
**License**: MIT
