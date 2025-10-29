# Chi Tiết Dự Án - BookStore

## Tổng Quan

BookStore là một ứng dụng web bán sách trực tuyến được xây dựng với Next.js 15, MongoDB, và Liquid Glass UI design. Dự án cung cấp đầy đủ tính năng cho cả khách hàng và quản trị viên.

## Công Nghệ Sử Dụng

### Frontend
- **Next.js 15**: Framework React với App Router
- **React 19**: Thư viện UI
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Zustand**: State management
- **React Hot Toast**: Notifications
- **Axios**: HTTP client

### Backend
- **Next.js API Routes**: RESTful API
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication

### Payment Integration
- **ZaloPay**: E-wallet payment (sandbox)
- **COD**: Cash on delivery

### UI/UX
- **Liquid Glass Design**: Modern glassmorphism UI
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion transitions
- **Icons**: Tabler Icons

## Kiến Trúc Hệ Thống

### 1. Frontend Architecture

```
Client (Browser)
    ↓
Next.js Pages (App Router)
    ↓
React Components
    ↓
Zustand Store (State Management)
    ↓
API Services (Axios)
    ↓
Next.js API Routes
```

### 2. Backend Architecture

```
API Routes
    ↓
Services Layer
    ↓
Mongoose Models
    ↓
MongoDB Database
```

### 3. Authentication Flow

```
User Login → JWT Token → Store in Zustand → Persist in LocalStorage
Protected Routes → Check Token → Allow/Deny Access
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "customer" | "admin",
  addresses: [{
    name: String,
    phone: String,
    address: String,
    city: String,
    zipCode: String,
    isDefault: Boolean
  }],
  wishlist: [ObjectId],
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Books Collection
```javascript
{
  _id: ObjectId,
  title: String,
  author: ObjectId (ref: Author),
  description: String,
  price: Number,
  discountPrice: Number,
  category: ObjectId (ref: Category),
  isbn: String,
  publisher: ObjectId (ref: Publisher),
  publishDate: Date,
  pages: Number,
  language: String,
  coverImage: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviewCount: Number,
  featured: Boolean,
  bestseller: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    bookId: ObjectId (ref: Book),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: "pending" | "confirmed" | "rejected" | "shipping" | "delivered" | "cancelled",
  paymentMethod: "zalopay" | "cod",
  paymentStatus: "pending" | "paid",
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    zipCode: String
  },
  transactionId: String,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  bookId: ObjectId (ref: Book),
  userId: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  helpful: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Authors Collection
```javascript
{
  _id: ObjectId,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Publishers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Đăng ký tài khoản
- `POST /api/auth/signin` - Đăng nhập

### Books
- `GET /api/books` - Lấy danh sách sách (có filter, search, pagination)
- `GET /api/books/[id]` - Chi tiết sách
- `POST /api/books` - Tạo sách mới (admin)
- `PUT /api/books/[id]` - Cập nhật sách (admin)
- `DELETE /api/books/[id]` - Xóa sách (admin)

### Orders
- `GET /api/orders/my?userId={id}` - Lấy đơn hàng của user
- `GET /api/orders?admin=true` - Lấy tất cả đơn hàng (admin)
- `GET /api/orders/[id]` - Chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PATCH /api/orders/[id]` - Cập nhật trạng thái đơn hàng (admin)

### Categories
- `GET /api/categories` - Lấy danh sách danh mục
- `POST /api/categories` - Tạo danh mục (admin)
- `PUT /api/categories/[id]` - Cập nhật danh mục (admin)
- `DELETE /api/categories/[id]` - Xóa danh mục (admin)

### Authors
- `GET /api/authors` - Lấy danh sách tác giả
- `POST /api/authors` - Tạo tác giả (admin)
- `DELETE /api/authors/[id]` - Xóa tác giả (admin)

### Publishers
- `GET /api/publishers` - Lấy danh sách nhà xuất bản
- `POST /api/publishers` - Tạo nhà xuất bản (admin)
- `DELETE /api/publishers/[id]` - Xóa nhà xuất bản (admin)

### Reviews
- `GET /api/reviews?bookId={id}` - Lấy đánh giá của sách
- `POST /api/reviews` - Tạo đánh giá mới

### Payment
- `POST /api/zalopay/create-payment` - Tạo thanh toán ZaloPay
- `POST /api/zalopay/callback` - Callback từ ZaloPay
- `GET /api/zalopay/check-status` - Kiểm tra trạng thái thanh toán

### Statistics
- `GET /api/stats` - Lấy thống kê (admin)

### Users
- `GET /api/users/[id]` - Lấy thông tin user
- `POST /api/users/addresses` - Thêm địa chỉ
- `PUT /api/users/addresses` - Cập nhật địa chỉ
- `DELETE /api/users/addresses` - Xóa địa chỉ

## Tính Năng Chi Tiết

### Khách Hàng

#### 1. Xem và Tìm Kiếm Sách
- Hiển thị danh sách sách với pagination
- Tìm kiếm theo tên sách, tác giả
- Lọc theo danh mục, giá
- Sắp xếp theo giá, đánh giá
- Xem chi tiết sách với ảnh, mô tả, đánh giá

#### 2. Giỏ Hàng
- Thêm/xóa sách vào giỏ hàng
- Cập nhật số lượng
- Tính tổng tiền tự động
- Lưu giỏ hàng trong localStorage

#### 3. Thanh Toán
- Chọn địa chỉ giao hàng (hỗ trợ nhiều địa chỉ)
- Chọn phương thức thanh toán (ZaloPay, COD)
- Thanh toán qua ZaloPay sandbox
- Xác nhận đơn hàng

#### 4. Quản Lý Đơn Hàng
- Xem danh sách đơn hàng
- Theo dõi trạng thái đơn hàng
- Xem chi tiết đơn hàng
- Tracking với timeline

#### 5. Đánh Giá Sách
- Đánh giá sao (1-5)
- Viết nhận xét
- Xem đánh giá của người khác

#### 6. Yêu Thích
- Thêm sách vào danh sách yêu thích
- Quản lý danh sách yêu thích

#### 7. Tài Khoản
- Đăng ký/đăng nhập
- Quản lý thông tin cá nhân
- Quản lý địa chỉ giao hàng
- Xem thống kê đơn hàng

### Quản Trị Viên

#### 1. Dashboard
- Thống kê tổng quan (sách, đơn hàng, khách hàng, doanh thu)
- Biểu đồ doanh thu theo tháng
- Biểu đồ bán hàng theo danh mục
- Top sách bán chạy
- Đơn hàng gần đây

#### 2. Quản Lý Sách
- Xem danh sách sách (card grid)
- Thêm sách mới
- Sửa thông tin sách
- Xóa sách
- Xem chi tiết sách (modal)

#### 3. Quản Lý Đơn Hàng
- Xem tất cả đơn hàng (card grid)
- Cập nhật trạng thái đơn hàng
- Xem chi tiết đơn hàng (modal)
- Lọc theo trạng thái

#### 4. Quản Lý Danh Mục
- Thêm/sửa/xóa danh mục
- Xem danh sách danh mục

#### 5. Quản Lý Tác Giả
- Thêm/xóa tác giả
- Xem danh sách tác giả

#### 6. Quản Lý Nhà Xuất Bản
- Thêm/xóa nhà xuất bản
- Xem danh sách nhà xuất bản

#### 7. Quản Lý Khách Hàng
- Xem danh sách khách hàng
- Xem thông tin chi tiết

#### 8. Thống Kê & Báo Cáo
- Doanh thu theo tháng
- Sách bán chạy theo danh mục
- Trạng thái đơn hàng
- Top sách bán chạy
- Xuất báo cáo CSV

## UI/UX Design

### Liquid Glass Theme
- **Glassmorphism**: Backdrop blur, transparency
- **Smooth Animations**: Framer Motion transitions
- **Gradient Colors**: Purple, pink, blue gradients
- **Rounded Corners**: Consistent border radius
- **Shadow Effects**: Layered shadows
- **Hover Effects**: Scale, translate animations

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Grid, flexbox
- **Touch Friendly**: Large tap targets

### Color Palette
- **Primary**: Purple (#9333EA) to Pink (#EC4899)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Blue (#3B82F6)

## Security

### Authentication
- JWT tokens với expiration
- Password hashing với bcryptjs
- Secure HTTP-only cookies (có thể implement)

### Authorization
- Role-based access control (customer, admin)
- Protected API routes
- Admin-only endpoints

### Data Validation
- Input validation với Zod
- MongoDB schema validation
- XSS protection

### Payment Security
- ZaloPay MAC signature verification
- Transaction ID tracking
- Payment status verification

## Performance Optimization

### Frontend
- Next.js Image optimization
- Code splitting
- Lazy loading components
- Memoization với React.memo
- Debounce search input

### Backend
- MongoDB indexing
- Lean queries
- Pagination
- Caching (có thể thêm Redis)

### Build
- TypeScript strict mode disabled (để build nhanh)
- ESLint ignored during build
- Production build optimization

## Testing

### Manual Testing Checklist
- [ ] Đăng ký/đăng nhập
- [ ] Xem danh sách sách
- [ ] Tìm kiếm và lọc sách
- [ ] Thêm vào giỏ hàng
- [ ] Thanh toán COD
- [ ] Thanh toán ZaloPay
- [ ] Xem đơn hàng
- [ ] Đánh giá sách
- [ ] Admin: Quản lý sách
- [ ] Admin: Quản lý đơn hàng
- [ ] Admin: Xem thống kê

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)
- Cập nhật `MONGODB_URI` với production database
- Đổi `JWT_SECRET` thành secret key mạnh
- Cập nhật `NEXT_PUBLIC_APP_URL` với domain thật
- Cấu hình ZaloPay production credentials

## Future Enhancements

### Phase 2
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced search với Elasticsearch
- [ ] Recommendation system
- [ ] Coupon/discount system
- [ ] Loyalty points
- [ ] Social login (Google, Facebook)

### Phase 3
- [ ] Multi-language support
- [ ] PWA support
- [ ] Real-time chat support
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Supplier management
- [ ] Automated reports

## Maintenance

### Regular Tasks
- Backup MongoDB database daily
- Monitor error logs
- Update dependencies monthly
- Review and optimize slow queries
- Clean up old orders/reviews

### Monitoring
- Server uptime
- API response times
- Database performance
- Error rates
- User activity

## Contributors

- Developer: [Your Name]
- Designer: [Designer Name]
- Project Manager: [PM Name]

## License

MIT License - Free to use for personal and commercial projects

## Contact

- Email: support@bookstore.com
- Website: https://bookstore.com
- GitHub: https://github.com/yourusername/bookstore
