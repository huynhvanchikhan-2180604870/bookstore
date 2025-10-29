# 🚀 Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
```bash
# Production .env
MONGODB_URI=mongodb+srv://production_uri
JWT_SECRET=strong_random_secret_min_32_chars
VNP_TMN_CODE=your_production_vnpay_code
VNP_HASH_SECRET=your_production_vnpay_secret
VNP_URL=https://vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=https://yourdomain.com/api/vnpay/return
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Build & Test
```bash
npm install
npm run build
npm start
```

### 3. Performance Optimization
- ✅ Image optimization với Sharp
- ✅ Code splitting automatic
- ✅ Framer Motion lazy loading
- ✅ Zustand persist storage
- ✅ API route caching

### 4. Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ VNPay signature verification
- ✅ CORS configuration
- ✅ Rate limiting (add middleware)
- ✅ Input validation (Zod)

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2: Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: VPS (Ubuntu)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone & Setup
git clone your-repo
cd bookstore
npm install
npm run build

# Start with PM2
pm2 start npm --name "bookstore" -- start
pm2 save
pm2 startup
```

## 📊 Monitoring

### Add Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### Add Google Analytics
```tsx
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

## 🔒 SSL Certificate
```bash
# Using Certbot
sudo certbot --nginx -d yourdomain.com
```

## 🗄️ Database Backup
```bash
# MongoDB Atlas automatic backups
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=/backup
```

## 📈 Performance Targets
- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Bundle Size: < 500KB

## 🔄 CI/CD Pipeline (GitHub Actions)
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
```

## 🎯 Post-Deployment

1. Test all payment flows (VNPay)
2. Verify email notifications
3. Check mobile responsiveness
4. Test all animations
5. Monitor error logs
6. Setup uptime monitoring
7. Configure CDN for images
8. Enable compression (gzip/brotli)

## 📞 Support Contacts
- VNPay Support: support@vnpay.vn
- MongoDB Atlas: support@mongodb.com

---
**Status**: ✅ PRODUCTION READY
**Version**: 2.0.0
**Last Updated**: 2025
