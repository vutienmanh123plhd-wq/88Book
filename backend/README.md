# 88Book Backend - Thực hành Routing, Cookie, Session & Authentication

Ứng dụng backend đơn giản để thực hành các khái niệm về routing, cookie, session, và xác thực người dùng.

## 📋 Yêu cầu chức năng

### 1. **Trang chủ** (`GET /`)
- Hiển thị giao diện hoặc nội dung tương ứng với theme đang lưu trong cookie (light/dark)
- Trả về trạng thái đăng nhập hiện tại

### 2. **Đặt Theme** (`GET /set-theme/:theme`)
- Cho phép lưu giá trị theme vào cookie
- Chỉ chấp nhận 2 giá trị: `light`, `dark`
- Cookie có thời gian sống 30 ngày
- Khi quay lại route `/`, nội dung phải thay đổi theo theme đã lưu

### 3. **Đăng nhập** (`POST /login`)
- Hướng dẫn: Gửi request POST với body chứa `username`
- Lưu username vào session
- Lưu loginTime vào session
- Reset bộ đếm truy cập /profile cho phiên mới

### 4. **Trang Cá nhân** (`GET /profile`)
- Chỉ cho phép truy cập khi đã đăng nhập
- Nếu chưa đăng nhập → trả về lỗi 401 với thông báo yêu cầu đăng nhập
- Hiển thị thông tin:
  - **Username**: Tên người dùng đã đăng nhập
  - **Login Time**: Thời điểm đăng nhập
  - **Profile Visit Count**: Số lần đã truy cập trang /profile trong phiên hiện tại
  - **Total Page Views**: Tổng số view trong session
- Bộ đếm tăng lên mỗi lần truy cập/F5 route `/profile`
- Bộ đếm chỉ có hiệu lực trong cùng một phiên (session)

### 5. **Đăng xuất** (`GET /logout`)
- Xóa session hiện tại
- Sau khi logout, người dùng mất trạng thái đăng nhập
- Nếu truy cập lại `/profile` → bị chặn và trả về thông báo chưa đăng nhập

### 6. **Xóa Theme Cookie** (`GET /logout-theme`)
- Xóa cookie theme
- Reset về theme mặc định (light)

### 7. **Xem Thông tin Session** (`GET /session-info`)
- Dành cho mục đích debug
- Hiển thị sessionId, user info, cookies, và session data

## 🚀 Hướng dẫn cài đặt & chạy

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```

### 2. Chạy server
```bash
# Chế độ bình thường
npm start

# Chế độ development (auto-restart khi code thay đổi)
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

## 📡 API Endpoints

### 1. Trang chủ
```
GET /
```
**Response:**
```json
{
  "message": "Welcome to 88Book",
  "theme": "light",
  "loginStatus": "Chưa đăng nhập",
  "username": null
}
```

---

### 2. Xem hướng dẫn đăng nhập
```
GET /login
```
**Response:**
```json
{
  "message": "Trang đăng nhập",
  "instruction": "Gửi POST request đến /login với body: { \"username\": \"tên_người_dùng\" }",
  "example": {
    "method": "POST",
    "url": "/login",
    "body": {
      "username": "user123"
    }
  }
}
```

---

### 3. Đăng nhập
```
POST /login
Content-Type: application/json

{
  "username": "user123"
}
```

**Response (thành công):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "user": {
    "username": "user123",
    "loginTime": "2024-12-15T10:30:45.000Z"
  }
}
```

**Response (thất bại - username trống):**
```json
{
  "success": false,
  "message": "Username không được để trống"
}
```

---

### 4. Xem thông tin cá nhân
```
GET /profile
```

**Response (đã đăng nhập):**
```json
{
  "success": true,
  "message": "Thông tin cá nhân",
  "user": {
    "username": "user123",
    "loginTime": "2024-12-15T10:30:45.000Z",
    "loginTimeFormatted": "15/12/2024 10:30:45",
    "timeSinceLoginSeconds": 120,
    "profileVisitCount": 3,
    "totalPageViewsInSession": 5
  },
  "note": "Số lần truy cập được tính trong cùng một phiên (session)"
}
```

**Response (chưa đăng nhập):**
```json
{
  "success": false,
  "message": "Chưa đăng nhập. Vui lòng đăng nhập trước.",
  "redirect": "/login"
}
```

---

### 5. Đặt theme
```
GET /set-theme/dark
```

**Response (hợp lệ):**
```json
{
  "success": true,
  "message": "Theme đã được đặt thành dark",
  "theme": "dark"
}
```

**Response (không hợp lệ):**
```json
{
  "success": false,
  "message": "Theme không hợp lệ. Chỉ chấp nhận: light, dark"
}
```

---

### 6. Đăng xuất
```
GET /logout
```

**Response (thành công):**
```json
{
  "success": true,
  "message": "Đăng xuất thành công",
  "logoutUser": "user123",
  "redirect": "/"
}
```

---

### 7. Xóa theme cookie
```
GET /logout-theme
```

**Response:**
```json
{
  "success": true,
  "message": "Theme cookie đã được xóa",
  "theme": "light (mặc định)"
}
```

---

### 8. Xem thông tin session (debug)
```
GET /session-info
```

**Response:**
```json
{
  "sessionId": "abc123def456",
  "user": {
    "username": "user123",
    "loginTime": "2024-12-15T10:30:45.000Z"
  },
  "cookies": {
    "theme": "dark"
  },
  "sessionData": {
    "profileVisitCount": 3,
    "viewCount": 5
  }
}
```

---

## 🧪 Kiểm tra với Postman hoặc cURL

### 1. Đặt theme thành dark
```bash
curl http://localhost:3000/set-theme/dark
```

### 2. Đăng nhập
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user123"}'
```

### 3. Xem profile (cần cookie session)
```bash
curl http://localhost:3000/profile
```

### 4. Xem profile lần thứ 2 (visit count sẽ tăng)
```bash
curl http://localhost:3000/profile
```

### 5. Đăng xuất
```bash
curl http://localhost:3000/logout
```

### 6. Cố gắng xem profile sau khi logout (sẽ bị chặn)
```bash
curl http://localhost:3000/profile
```

---

## 📚 Khái niệm thực hành

### Cookie
- **Định nghĩa**: Cookie là dữ liệu nhỏ lưu trên phía client
- **Ứng dụng**: Lưu theme (light/dark) của người dùng
- **Thời gian sống**: Cookie theme sống 30 ngày
- **Truy cập**: Mỗi request gửi đến server sẽ tự động kèm cookie

### Session
- **Định nghĩa**: Session là dữ liệu lưu trên phía server cho mỗi người dùng
- **Ứng dụng**: Lưu thông tin đăng nhập (username, loginTime), bộ đếm truy cập
- **Thời gian sống**: Session sống mặc định 24 giờ
- **Xác định người dùng**: Thông qua session ID được lưu trong cookie `connect.sid`

### Middleware
- **`requireLogin`**: Middleware kiểm tra xem người dùng đã đăng nhập hay chưa
- **Express Session**: Middleware quản lý session
- **Cookie Parser**: Middleware phân tích cookie

---

## 🔐 Lưu ý bảo mật

⚠️ **Điều này là ứng dụng thực hành, không phải sản phẩm production**

Để sản xuất, cần:
1. Thay đổi secret key: `'your-secret-key-change-this'`
2. Bật HTTPS (set `cookie.secure = true`)
3. Hash password thay vì lưu username trực tiếp
4. Sử dụng database thực (MongoDB, PostgreSQL, MySQL, v.v.)
5. Thêm CSRF protection
6. Thêm rate limiting
7. Validate & sanitize input

---

## 📝 Ghi chú

- Ứng dụng không sử dụng database, tất cả dữ liệu lưu trong memory
- Khi server restart, tất cả session sẽ bị xóa
- Số lần truy cập `/profile` được tính trong cùng một phiên
- Mỗi phiên (session) mới sẽ reset bộ đếm

---

## 🎯 Mục tiêu học tập

✅ Hiểu cách hoạt động của routing trong Express  
✅ Nắm vững cookie và cách lưu/truy xuất dữ liệu  
✅ Hiểu session và quản lý trạng thái người dùng  
✅ Thực hành middleware  
✅ Kiểm soát truy cập dựa trên trạng thái đăng nhập  
✅ Xử lý form đăng nhập/đăng xuất  

---

**Happy Coding! 🚀**
