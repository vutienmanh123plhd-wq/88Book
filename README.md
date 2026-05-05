# 📚 Book Selling Website - Full Stack

A complete **full-stack e-commerce platform** for buying and selling books online.

## 🎯 Features

### For Buyers

- ✅ Browse books with search, filtering, and sorting
- ✅ View detailed book information
- ✅ Secure user registration and login
- ✅ Shopping cart management
- ✅ Checkout process with address input
- ✅ Order history and tracking
- ✅ Wishlist management

### For Sellers

- ✅ Register as seller
- ✅ Add, edit, and delete books
- ✅ Manage inventory
- ✅ View sales and orders
- ✅ Update order status
- ✅ Track revenue and statistics

### Admin Features

- ✅ User management
- ✅ Order management
- ✅ Book category management
- ✅ Analytics and reports

## 🏗️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Context API** for state management

### Backend

- **Node.js** with Express.js
- **PostgreSQL** for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing

### DevOps

- **Docker** for containerization
- **Docker Compose** for service orchestration

## 📋 Prerequisites

- Node.js v16+
- PostgreSQL 12+ (or Docker)
- npm or yarn
- Git (optional)

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Install Docker & Docker Compose

# Start both backend and database
docker-compose up -d

# In another terminal, start frontend
cd "Book Selling Website"
npm install
npm run dev
```

Open http://localhost:5173

### Option 2: Manual Setup

See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

## 📁 Project Structure

```
Book Selling Website/
├── src/
│   ├── api/          # API client & endpoints
│   ├── contexts/     # State management contexts
│   ├── app/          # React components
│   └── styles/       # CSS & Tailwind config
└── package.json

backend/
├── config/           # Database configuration
├── controllers/      # Business logic
├── middleware/       # Auth & validation
├── routes/           # API endpoints
├── migrations/       # Database setup
└── server.js         # Express entry point
```

## 🔐 Authentication

- Users can register as **Buyer** or **Seller**
- JWT tokens stored in localStorage
- Protected routes for authenticated users
- Role-based access control (RBAC)

## 📚 Database Schema

### Users Table

- id, email, password, full_name, role, created_at, updated_at

### Books Table

- id, title, author, description, price, category, isbn, quantity, image_url, seller_id, created_at, updated_at

### Cart Items Table

- id, user_id, book_id, quantity, created_at

### Orders Table

- id, user_id, total_amount, status, shipping_address, payment_method, created_at, updated_at

### Order Items Table

- id, order_id, book_id, seller_id, quantity, price, created_at

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me           - Get current user
```

### Books

```
GET    /api/books              - List all books (with filters)
GET    /api/books/:id         - Get book details
POST   /api/books             - Create book (seller only)
PUT    /api/books/:id         - Update book (seller only)
DELETE /api/books/:id         - Delete book (seller only)
```

### Shopping Cart

```
GET    /api/cart              - Get user cart
POST   /api/cart              - Add item to cart
PUT    /api/cart/:id          - Update cart item
DELETE /api/cart/:id          - Remove from cart
DELETE /api/cart              - Clear cart
```

### Orders

```
POST   /api/orders            - Create order
GET    /api/orders            - List user orders
GET    /api/orders/:id        - Get order details
PUT    /api/orders/:id/cancel - Cancel order
```

### Seller API

```
GET    /api/seller/books      - Seller's books
GET    /api/seller/orders     - Seller's orders
GET    /api/seller/stats      - Seller statistics
PUT    /api/seller/orders/:id/status - Update order status
```

### User Account

```
GET    /api/users/profile     - Get user profile
PUT    /api/users/profile     - Update profile
PUT    /api/users/change-password - Change password
GET    /api/users/public/:id  - Get public user info
```

## 🧪 Testing

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "role": "buyer"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Get Books:**

```bash
curl "http://localhost:5000/api/books?page=1&limit=20&search=harry&category=fiction"
```

**Add to Cart (with JWT token):**

```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"bookId": 1, "quantity": 2}'
```

## 📖 Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick setup guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [backend/README.md](./backend/README.md) - Backend API documentation

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Database Connection Error

```bash
# Verify PostgreSQL is running
pg_isready

# Check credentials in .env
# Ensure database exists
createdb book_store
```

### API Not Working

- Verify backend is running on port 5000
- Check `.env.local` in frontend for API URL
- Look at browser console and backend logs for errors

## 🚢 Deployment

### Heroku

```bash
# Create Heroku apps
heroku create my-book-backend
heroku create my-book-frontend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev -a my-book-backend

# Deploy backend
cd backend
git push heroku main

# Deploy frontend
cd "Book Selling Website"
git push heroku main
```

### AWS / Azure / GCP

See deployment guides in documentation.

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=book_store
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔄 Development Workflow

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run migrate
npm run dev

# Terminal 2: Start Frontend
cd "Book Selling Website"
npm install
npm run dev
```

Both should be running:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api

## 📊 Metrics & Analytics

Seller dashboard includes:

- Total books listed
- Total inventory count
- Total orders received
- Total revenue
- Recent orders (last 30 days)

## 🔒 Security Features

- Passwords hashed with bcryptjs
- JWT-based authentication
- Role-based access control
- Protected API endpoints
- Input validation & sanitization
- CORS configuration
- Environment variables for secrets

## 🎨 Customization

### Styling

- Edit `/src/styles/` for CSS
- Modify Tailwind config in `tailwind.config.js`
- Update theme colors in CSS variables

### Database

- Modify schema in `backend/migrations/run.js`
- Add new tables as needed
- Update controllers & routes

### Features

- Add new routes in `backend/routes/`
- Create controllers in `backend/controllers/`
- Add React components in `src/app/components/`

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🆘 Support

For issues or questions:

1. Check existing documentation
2. Review error messages in console/logs
3. Check browser DevTools (F12)
4. Verify environment configuration
5. See troubleshooting section

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Book reviews and ratings
- [ ] Advanced admin dashboard
- [ ] Search with Elasticsearch
- [ ] Multiple images per book
- [ ] Inventory alerts
- [ ] Return/refund management
- [ ] Social sharing
- [ ] Mobile app

---

**Made with ❤️ for book lovers** 📚✨

_Last updated: April 2026_
