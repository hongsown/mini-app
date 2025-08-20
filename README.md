# 123 Fakturera Mini-App

A modern, responsive web application built with React.js, Vite.js, Fastify, and PostgreSQL, featuring a Terms of Service page and an editable Product Price List.

## 🚀 Live Demo

- **Frontend**: [Your deployment URL here]
- **Backend API**: [Your API deployment URL here]
- **Repository**: [Your GitHub repository URL here]

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)

## 🛠️ Tech Stack

### Frontend
- **React.js**: v18.2.0 - Component-based UI library
- **Vite.js**: v4.5.0 - Fast build tool and dev server
- **React Router DOM**: v6.18.0 - Client-side routing
- **JavaScript ES Modules** - Modern JavaScript syntax
- **Vanilla CSS** - Custom responsive styling (no frameworks)

### Backend
- **Fastify**: v4.24.3 - Fast and low overhead web framework
- **Sequelize**: v6.34.0 - Object-Relational Mapping (ORM)
- **PostgreSQL**: Database system
- **Node.js**: JavaScript runtime environment

### Development Tools
- **ESLint**: Code linting
- **Vite Dev Server**: Hot module replacement
- **Nodemon**: Backend auto-restart during development

## ✨ Features

### Terms Page
- 📱 **Responsive Design**: Desktop, tablet (landscape + portrait), mobile (landscape + portrait)
- 🍔 **Hamburger Menu**: Fully functional navigation menu
- 🌐 **Language Switching**: English/Swedish with dynamic content loading
- 🎨 **Visual Design**: Background image, overlay effects, modern styling
- 🔄 **Dynamic Content**: Terms loaded from PostgreSQL database
- 🖼️ **Asset Integration**: Logo, flag icons, background images

### Pricelist Page
- 📊 **Data Table**: 25 product rows for scrolling test
- ✏️ **Editable Fields**: Click-to-edit functionality with auto-save
- 💾 **Real-time Updates**: Changes saved immediately to database
- 📱 **Responsive Table**: Adaptive column hiding for different screen sizes
- 🔍 **Product Management**: Name, pricing, category, description, status fields
- ⚡ **Loading States**: Visual feedback during data operations

## 📁 Project Structure

```
mini-app/
├── frontend/                   # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/
│   │   │   └── css/           # Vanilla CSS stylesheets
│   │   ├── components/        # Reusable React components
│   │   │   ├── HamburgerMenu.jsx
│   │   │   └── EditableCell.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Terms.jsx
│   │   │   └── Pricelist.jsx
│   │   ├── services/          # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Application entry point
│   ├── package.json
│   └── vite.config.js         # Vite configuration
├── backend/                    # Fastify backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   │   └── database.js
│   │   ├── models/            # Sequelize models
│   │   │   ├── TermsText.js
│   │   │   ├── Product.js
│   │   │   └── index.js
│   │   ├── routes/            # API route handlers
│   │   │   ├── terms.js
│   │   │   └── products.js
│   │   ├── migrations/        # Database migrations
│   │   │   ├── 001-create-tables.sql
│   │   │   └── run-migrations.js
│   │   └── server.js          # Application entry point
│   ├── package.json
│   └── .env.example           # Environment variables template
└── README.md                  # This file
```

## 🗄️ Database Schema

### `terms_texts` Table
```sql
CREATE TABLE terms_texts (
    id SERIAL PRIMARY KEY,
    lang VARCHAR(2) NOT NULL CHECK (lang IN ('en', 'sv')),
    section VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `products` Table
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_price DECIMAL(10,2),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone [your-repository-url]
cd mini-app
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb miniapp

# Or using SQL:
# CREATE DATABASE miniapp;
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your database credentials
nano .env

# Run database migrations
npm run migrate

# Start backend server
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables (.env)
```env
# Database Configuration
DB_NAME=miniapp
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432

# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

## 👨‍💻 Development

### Available Scripts

#### Backend (`/backend`)
```bash
npm run dev        # Start development server with auto-reload
npm start          # Start production server
npm run migrate    # Run database migrations
```

#### Frontend (`/frontend`)
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Development Workflow
1. Start PostgreSQL database
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Open browser to `http://localhost:5173`

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3001/api`
- Production: `[Your production API URL]/api`

### Endpoints

#### Terms API
```
GET /api/terms?lang={en|sv}
```
**Description**: Fetch terms content in specified language
**Response**: 
```json
{
  "success": true,
  "data": {
    "language": "en",
    "terms": {
      "header": "123 Fakturera - Terms of Service",
      "introduction": "Welcome to 123 Fakturera...",
      "service_description": "Our Service Description",
      // ... more sections
    }
  }
}
```

#### Products API
```
GET /api/products
GET /api/products?category={category}
GET /api/products/{id}
POST /api/products/{id}
GET /api/products/categories
```

**GET /api/products**: Fetch all products
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Web Development - Basic Package",
      "in_price": 800.00,
      "price": 1200.00,
      "category": "Development",
      "description": "Basic website development...",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**POST /api/products/{id}**: Update product
**Request Body**:
```json
{
  "name": "Updated Product Name",
  "price": 1500.00,
  "category": "New Category"
}
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

#### Build Command
```bash
npm run build
```

#### Environment Variables
```
VITE_API_URL=https://your-api-domain.com/api
```

### Backend Deployment (Railway/Render/Heroku)

#### Build Command
```bash
npm install
```

#### Start Command
```bash
npm start
```

#### Environment Variables
```
DB_NAME=your_production_db
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Database Setup (Production)
```bash
# Run migrations on production database
npm run migrate
```

### Docker Deployment (Optional)

#### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: miniapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_NAME: miniapp
      DB_USER: postgres
      DB_PASS: password
```

## 📱 Responsive Design

The application is fully responsive with carefully crafted breakpoints:

### Breakpoints
- **Desktop**: 1025px+ (Full table with all columns)
- **Tablet Landscape**: 768px - 1024px (Hide category column)
- **Tablet Portrait**: 481px - 767px (Hide description column)
- **Mobile Landscape**: 321px - 480px (Hide status/date columns)
- **Mobile Portrait**: 320px and below (Minimal columns)

### Responsive Features
- ✅ Adaptive navigation (hamburger menu)
- ✅ Responsive table columns
- ✅ Flexible typography scaling
- ✅ Touch-friendly interface elements
- ✅ Optimized image loading
- ✅ Fluid layouts and spacing

### Testing Responsive Design
```bash
# Test different viewport sizes
# Desktop: 1920x1080, 1366x768
# Tablet: 768x1024 (portrait), 1024x768 (landscape)
# Mobile: 375x667 (iPhone), 414x896 (iPhone Plus), 360x640 (Android)
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Technical Notes

### CSS Architecture
- **Vanilla CSS**: No frameworks for complete control
- **CSS Variables**: Centralized theming system
- **Mobile-first**: Responsive design approach
- **BEM-like**: Consistent naming conventions
- **Performance**: Optimized CSS delivery

### JavaScript Features
- **ES Modules**: Modern module system
- **Async/Await**: Promise-based API calls
- **React Hooks**: useState, useEffect for state management
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Component-based routing

### Security
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (Sequelize ORM)
- ✅ Environment variable protection
- ✅ Error message sanitization

### Performance Optimizations
- ⚡ Vite for fast development and builds
- ⚡ Image lazy loading
- ⚡ Database indexing
- ⚡ API response caching
- ⚡ Minified production builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m "Add feature description"`
5. Push to your fork: `git push origin feature-name`
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: 123Fakturera original terms page
- **Assets**: Flag icons and background images from 123Fakturera
- **Framework Documentation**: React, Vite, Fastify, Sequelize teams

---

**Built with ❤️ using React, Vite, Fastify, and PostgreSQL**

For questions or support, please open an issue in the repository.