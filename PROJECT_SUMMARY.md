# BookStore - Mô Tả Ngắn Gọn

## Giới Thiệu

**BookStore** là ứng dụng web bán sách trực tuyến hiện đại với giao diện Liquid Glass đẹp mắt, được xây dựng bằng Next.js 15 và MongoDB.

## Công Nghệ

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **UI**: Liquid Glass Design, Framer Motion
- **Payment**: ZaloPay, COD
- **State**: Zustand

## Tính Năng Chính

### Khách Hàng
✅ Xem và tìm kiếm sách  
✅ Giỏ hàng và thanh toán (ZaloPay, COD)  
✅ Quản lý đơn hàng với tracking  
✅ Đánh giá và nhận xét sách  
✅ Danh sách yêu thích  
✅ Quản lý địa chỉ giao hàng  

### Quản Trị
✅ Dashboard với thống kê và biểu đồ  
✅ Quản lý sách, danh mục, tác giả, NXB  
✅ Quản lý đơn hàng và khách hàng  
✅ Báo cáo doanh thu và phân tích  

## Cài Đặt Nhanh

```bash
# Clone và cài đặt
git clone <repo-url>
cd book-store
npm install

# Cấu hình
cp .env.example .env.local
# Cập nhật MONGODB_URI trong .env.local

# Chạy
npm run dev
```

Truy cập: http://localhost:3000

## Cấu Trúc

```
book-store/
├── app/              # Pages & API routes
├── components/       # React components
├── models/           # MongoDB models
├── lib/              # Utilities
├── store/            # State management
└── styles/           # Global styles
```

## API Chính

- `GET /api/books` - Danh sách sách
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/my` - Đơn hàng của user
- `GET /api/orders?admin=true` - Tất cả đơn (admin)
- `POST /api/zalopay/create-payment` - Thanh toán ZaloPay

## Database

- **Users**: Khách hàng và admin
- **Books**: Sách với tác giả, NXB, danh mục
- **Orders**: Đơn hàng với items và trạng thái
- **Reviews**: Đánh giá sách
- **Categories**: Danh mục sách
- **Authors**: Tác giả
- **Publishers**: Nhà xuất bản

## Tài Khoản Demo

### Admin
- Email: admin@bookstore.com
- Password: admin123

### Customer
- Đăng ký tại: /auth/signup

## Screenshots

### Trang Chủ
- Hero section với gradient
- Danh sách sách nổi bật
- Danh mục sách

### Chi Tiết Sách
- Ảnh sách với gallery
- Thông tin chi tiết
- Đánh giá và nhận xét

### Giỏ Hàng & Thanh Toán
- Quản lý giỏ hàng
- Chọn địa chỉ giao hàng
- Thanh toán ZaloPay/COD

### Admin Dashboard
- Thống kê tổng quan
- Biểu đồ doanh thu
- Quản lý sách, đơn hàng

## Đặc Điểm Nổi Bật

🎨 **Liquid Glass UI** - Giao diện hiện đại với glassmorphism  
⚡ **Next.js 15** - Performance cao với App Router  
📱 **Responsive** - Tối ưu cho mọi thiết bị  
🔐 **Secure** - JWT authentication, password hashing  
💳 **Payment** - Tích hợp ZaloPay sandbox  
📊 **Analytics** - Dashboard với biểu đồ thống kê  
🚀 **Fast** - Optimized với caching và lazy loading  

## Yêu Cầu

- Node.js 18+
- MongoDB 6+
- npm/yarn

## Build Production

```bash
npm run build
npm start
```

## Deploy

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t bookstore .
docker run -p 3000:3000 bookstore
```

## Tài Liệu

- **INSTALLATION.md** - Hướng dẫn cài đặt chi tiết
- **PROJECT_DETAILS.md** - Mô tả chi tiết dự án
- **README.md** - Cấu trúc và tổng quan

## License

MIT License

## Contact

📧 Email: support@bookstore.com  
🌐 Website: https://bookstore.com  
💻 GitHub: https://github.com/yourusername/bookstore

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Status**: Production Ready ✅
