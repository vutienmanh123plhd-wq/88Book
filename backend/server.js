const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    secure: false, // Set to true if using HTTPS
    httpOnly: true
  }
}));

// Middleware để ghi nhận số lần truy cập
app.use((req, res, next) => {
  if (req.session.user) {
    req.session.viewCount = (req.session.viewCount || 0) + 1;
  }
  next();
});

// Middleware kiểm tra đăng nhập
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Chưa đăng nhập. Vui lòng đăng nhập trước.',
      redirect: '/login'
    });
  }
  next();
};

// Routes

/**
 * GET /
 * Trang chủ - hiển thị theme từ cookie
 */
app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.json({
    message: 'Welcome to 88Book',
    theme: theme,
    loginStatus: req.session.user ? 'Đã đăng nhập' : 'Chưa đăng nhập',
    username: req.session.user ? req.session.user.username : null
  });
});

/**
 * GET /login
 * Hiển thị form đăng nhập hoặc hướng dẫn
 */
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.json({
      message: 'Bạn đã đăng nhập rồi',
      redirect: '/profile'
    });
  }
  
  res.json({
    message: 'Trang đăng nhập',
    instruction: 'Gửi POST request đến /login với body: { "username": "tên_người_dùng" }',
    example: {
      method: 'POST',
      url: '/login',
      body: {
        username: 'user123'
      }
    }
  });
});

/**
 * POST /login
 * Xử lý đăng nhập - lưu username và loginTime vào session
 */
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Kiểm tra username
  if (!username || username.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Username không được để trống'
    });
  }

  // Kiểm tra độ dài username
  if (username.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Username phải có ít nhất 3 ký tự'
    });
  }

  // Lưu thông tin vào session
  req.session.user = {
    username: username.trim(),
    loginTime: new Date().toISOString()
  };

  // Reset số lần truy cập /profile cho phiên mới
  req.session.profileVisitCount = 0;
  req.session.viewCount = 0;

  res.json({
    success: true,
    message: 'Đăng nhập thành công',
    user: {
      username: req.session.user.username,
      loginTime: req.session.user.loginTime
    }
  });
});

/**
 * GET /profile
 * Trang cá nhân - chỉ cho phép khi đã đăng nhập
 * Hiển thị: username, loginTime, số lần truy cập trong phiên
 */
app.get('/profile', requireLogin, (req, res) => {
  // Tăng bộ đếm lần truy cập /profile
  if (!req.session.profileVisitCount) {
    req.session.profileVisitCount = 0;
  }
  req.session.profileVisitCount += 1;

  const loginTime = new Date(req.session.user.loginTime);
  const now = new Date();
  const timeSinceLogin = Math.floor((now - loginTime) / 1000); // Tính theo giây

  res.json({
    success: true,
    message: 'Thông tin cá nhân',
    user: {
      username: req.session.user.username,
      loginTime: req.session.user.loginTime,
      loginTimeFormatted: loginTime.toLocaleString('vi-VN'),
      timeSinceLoginSeconds: timeSinceLogin,
      profileVisitCount: req.session.profileVisitCount,
      totalPageViewsInSession: req.session.viewCount
    },
    note: 'Số lần truy cập được tính trong cùng một phiên (session)'
  });
});

/**
 * GET /logout
 * Đăng xuất - xóa session
 */
app.get('/logout', (req, res) => {
  if (!req.session.user) {
    return res.json({
      message: 'Bạn chưa đăng nhập'
    });
  }

  const username = req.session.user.username;

  // Xóa session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi đăng xuất',
        error: err.message
      });
    }

    res.json({
      success: true,
      message: 'Đăng xuất thành công',
      logoutUser: username,
      redirect: '/'
    });
  });
});

/**
 * GET /set-theme/:theme
 * Đặt theme vào cookie
 * Chấp nhận: light, dark
 */
app.get('/set-theme/:theme', (req, res) => {
  const { theme } = req.params;
  const validThemes = ['light', 'dark'];

  // Kiểm tra theme hợp lệ
  if (!validThemes.includes(theme)) {
    return res.status(400).json({
      success: false,
      message: `Theme không hợp lệ. Chỉ chấp nhận: ${validThemes.join(', ')}`
    });
  }

  // Lưu theme vào cookie
  res.cookie('theme', theme, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 ngày
    httpOnly: true,
    path: '/'
  });

  res.json({
    success: true,
    message: `Theme đã được đặt thành ${theme}`,
    theme: theme
  });
});

/**
 * GET /logout
 * Xóa cookie theme
 */
app.get('/logout-theme', (req, res) => {
  res.clearCookie('theme', { path: '/' });
  res.json({
    success: true,
    message: 'Theme cookie đã được xóa',
    theme: 'light (mặc định)'
  });
});

/**
 * GET /session-info
 * Xem thông tin session hiện tại (cho mục đích debug)
 */
app.get('/session-info', (req, res) => {
  res.json({
    sessionId: req.sessionID,
    user: req.session.user || null,
    cookies: {
      theme: req.cookies.theme || 'light'
    },
    sessionData: {
      profileVisitCount: req.session.profileVisitCount || 0,
      viewCount: req.session.viewCount || 0
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route không tồn tại',
    availableRoutes: [
      'GET /',
      'GET /login',
      'POST /login',
      'GET /profile',
      'GET /logout',
      'GET /set-theme/:theme (light|dark)',
      'GET /logout-theme',
      'GET /session-info'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server đang chạy tại http://localhost:${PORT}`);
  console.log(`\n📝 Hướng dẫn sử dụng:\n`);
  console.log(`1. Truy cập trang chủ: GET http://localhost:${PORT}/`);
  console.log(`2. Đặt theme: GET http://localhost:${PORT}/set-theme/dark`);
  console.log(`3. Đăng nhập: POST http://localhost:${PORT}/login (body: { "username": "user123" })`);
  console.log(`4. Xem profile: GET http://localhost:${PORT}/profile`);
  console.log(`5. Đăng xuất: GET http://localhost:${PORT}/logout`);
  console.log(`6. Xem thông tin session: GET http://localhost:${PORT}/session-info\n`);
});

module.exports = app;
