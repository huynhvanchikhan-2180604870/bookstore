# BookStore Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

## Environment Setup

The `.env.local` file has been created with your MongoDB credentials.

## Running the Project

1. Development mode:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
npm start
```

## Project Structure

✅ Complete folder structure created
✅ All models (Book, User, Order, Category, Review, Cart)
✅ API routes (books, auth, cart, orders, reviews, categories)
✅ UI components (GlassCard, Button, Input, etc.)
✅ Layout components (Header, Footer)
✅ Pages (Home, Shop, Books, Cart, Auth, Admin)
✅ Services (bookService, userService, cartService, orderService)
✅ Contexts (AuthContext, CartContext)
✅ Hooks (useAuth, useCart)
✅ Middleware (auth)
✅ Liquid Glass CSS styles

## Features Implemented

### Frontend
- ✅ Liquid glass morphism design
- ✅ Responsive layout
- ✅ Authentication pages (Sign In/Sign Up)
- ✅ Shop and Books pages
- ✅ Cart page
- ✅ Admin dashboard
- ✅ Admin book management

### Backend
- ✅ MongoDB connection
- ✅ User authentication (JWT)
- ✅ Books API (CRUD)
- ✅ Categories API
- ✅ Cart API
- ✅ Orders API
- ✅ Reviews API

### Database Models
- ✅ Book
- ✅ User
- ✅ Order
- ✅ Category
- ✅ Review
- ✅ Cart

## Next Steps

1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start the development server
3. Visit http://localhost:3000

## Available Routes

- `/` - Home page
- `/shop` - Shop page
- `/books` - All books
- `/books/[id]` - Book details
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up
- `/profile` - User profile
- `/admin` - Admin dashboard
- `/admin/books` - Manage books
- `/admin/books/create` - Create new book

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/books` - Get all books
- `GET /api/books/[id]` - Get book by ID
- `POST /api/books` - Create book (admin)
- `PUT /api/books/[id]` - Update book (admin)
- `DELETE /api/books/[id]` - Delete book (admin)
- `GET /api/categories` - Get categories
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `GET /api/reviews` - Get reviews

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- JWT Authentication
- Liquid Glass UI Design

## Project Complete! 🚀

All core features have been implemented. You can now:
1. Install dependencies
2. Start the development server
3. Begin adding books and testing features
