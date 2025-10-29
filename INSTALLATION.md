# Hướng Dẫn Cài Đặt - BookStore

## Yêu Cầu Hệ Thống

- Node.js 18.x trở lên
- MongoDB 6.x trở lên
- npm hoặc yarn
- Git

## Bước 1: Clone Repository

```bash
git clone <repository-url>
cd book-store
```

## Bước 2: Cài Đặt Dependencies

```bash
npm install
```

## Bước 3: Cấu Hình Environment Variables

Tạo file `.env.local` từ file mẫu:

```bash
cp .env.example .env.local
```

Cập nhật các biến môi trường trong `.env.local`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bookstore
# Hoặc MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore

# Authentication
JWT_SECRET=your-secret-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# ZaloPay (Sandbox)
ZALOPAY_APP_ID=554
ZALOPAY_KEY1=8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn
ZALOPAY_KEY2=uUfsWgfLkRLzq6W2uNXTCxrfxs51auny

# Application
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Bước 4: Khởi Động MongoDB

### MongoDB Local:
```bash
mongod
```

### MongoDB Atlas:
- Tạo cluster trên [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Lấy connection string và cập nhật vào `MONGODB_URI`

## Bước 5: Seed Dữ Liệu Mẫu (Tùy chọn)

```bash
# Seed categories, authors, publishers
curl http://localhost:3000/api/seed

# Seed books
curl http://localhost:3000/api/seed-books
```

Hoặc truy cập trực tiếp:
- http://localhost:3000/api/seed
- http://localhost:3000/api/seed-books

## Bước 6: Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Bước 7: Tạo Tài Khoản Admin

### Cách 1: Qua API
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bookstore.com",
    "password": "admin123",
    "name": "Admin"
  }'
```

Sau đó vào MongoDB và cập nhật role:
```javascript
db.users.updateOne(
  { email: "admin@bookstore.com" },
  { $set: { role: "admin" } }
)
```

### Cách 2: Qua UI
1. Truy cập http://localhost:3000/auth/signup
2. Đăng ký tài khoản
3. Vào MongoDB và đổi role thành "admin"

## Bước 8: Truy Cập Ứng Dụng

- **Trang chủ**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Đăng nhập**: http://localhost:3000/auth/signin
- **Cửa hàng**: http://localhost:3000/shop

## Build Production

```bash
# Build
npm run build

# Start production server
npm start
```

## Cấu Trúc Thư Mục Quan Trọng

```
book-store/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── books/             # Book pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout pages
│   ├── profile/           # User profile pages
│   └── shop/              # Shop page
├── components/            # React components
├── lib/                   # Utilities
├── models/                # MongoDB models
├── services/              # API services
├── store/                 # Zustand store
└── styles/                # Global styles
```

## Troubleshooting

### Lỗi kết nối MongoDB
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Giải pháp**: Đảm bảo MongoDB đang chạy

### Lỗi port đã được sử dụng
```
Error: Port 3000 is already in use
```
**Giải pháp**: 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Lỗi build TypeScript
```bash
npm run build
```
Nếu gặp lỗi TypeScript, kiểm tra file `tsconfig.json` và `next.config.ts`

## Tính Năng Chính

✅ Xem và tìm kiếm sách
✅ Giỏ hàng và thanh toán
✅ Thanh toán ZaloPay và COD
✅ Quản lý đơn hàng
✅ Đánh giá sách
✅ Admin dashboard
✅ Quản lý sách, danh mục, tác giả, nhà xuất bản
✅ Thống kê và báo cáo

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs trong terminal
2. Kiểm tra MongoDB connection
3. Xóa folder `.next` và chạy lại `npm run dev`
4. Xóa `node_modules` và chạy lại `npm install`

## License

MIT
