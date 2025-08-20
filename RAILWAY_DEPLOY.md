# Railway Deployment Guide

## Cách deploy dự án lên Railway sử dụng Docker Compose

### 1. Chuẩn bị trước khi deploy

1. **Tạo tài khoản Railway**: Truy cập [railway.app](https://railway.app) và đăng ký
2. **Cài đặt Railway CLI** (tuỳ chọn):
   ```bash
   npm install -g @railway/cli
   railway login
   ```

### 2. Thiết lập dự án trên Railway

1. **Tạo project mới**:
   - Đăng nhập vào Railway dashboard
   - Click "New Project"
   - Chọn "Deploy from GitHub repo"
   - Connect GitHub account và chọn repository này

2. **Thêm PostgreSQL database**:
   - Trong project dashboard, click "New Service"
   - Chọn "Database" → "PostgreSQL"
   - Railway sẽ tự động tạo database và cung cấp connection string

### 3. Cấu hình biến môi trường

Trong Railway project settings, thêm các biến môi trường sau:

```bash
# Database (Railway PostgreSQL sẽ tự động cung cấp DATABASE_URL)
DATABASE_URL=postgresql://... # Tự động từ PostgreSQL service
DB_HOST=... # Lấy từ PostgreSQL service
DB_NAME=... # Lấy từ PostgreSQL service  
DB_USER=... # Lấy từ PostgreSQL service
DB_PASS=... # Lấy từ PostgreSQL service
DB_PORT=5432

# Server
PORT=3001
NODE_ENV=production

# Frontend
FRONTEND_URL=https://your-app-name.railway.app
VITE_API_URL=https://your-app-name.railway.app/api
CORS_ORIGIN=https://your-app-name.railway.app
```

### 4. Deploy

1. **Automatic deployment**:
   - Railway sẽ tự động deploy khi bạn push code lên GitHub
   - Sử dụng file `railway.toml` để cấu hình

2. **Manual deployment** (với Railway CLI):
   ```bash
   railway up
   ```

### 5. Kiểm tra deployment

1. **Logs**: Xem logs trong Railway dashboard
2. **Health check**: Railway sẽ kiểm tra endpoint `/health`
3. **Database**: Kiểm tra database connection trong logs

### 6. Custom Domain (tuỳ chọn)

1. Trong Railway dashboard, chọn service
2. Vào tab "Settings" → "Domains"
3. Thêm custom domain của bạn

### 7. Troubleshooting

**Common issues:**

1. **Port binding**: Đảm bảo ứng dụng listen trên `0.0.0.0:$PORT`
2. **Database connection**: Kiểm tra DATABASE_URL từ PostgreSQL service
3. **Build errors**: Xem logs trong Railway dashboard
4. **CORS issues**: Cập nhật CORS_ORIGIN với domain thực tế

**Useful commands:**
```bash
# View logs
railway logs

# Connect to database
railway connect postgresql

# Run migrations
railway run npm run migrate
```

### 8. Monitoring

- Railway cung cấp metrics tự động
- Sử dụng health check để monitor uptime
- Xem logs real-time trong dashboard

## Files quan trọng cho Railway:

- `docker-compose.railway.yml` - Docker Compose config cho Railway
- `railway.toml` - Railway project configuration
- `.env.railway.example` - Mẫu biến môi trường
- `RAILWAY_DEPLOY.md` - Hướng dẫn này