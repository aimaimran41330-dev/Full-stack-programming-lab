# Rustik Plank - MERN Stack eCommerce App
### Lab 12 | Full Stack Programming | BSSE-VI

A complete dynamic eCommerce application for handcrafted furniture, built with the MERN stack + Next.js.

---

## 🛠️ Tech Stack

| Layer     | Technology                         |
|-----------|-------------------------------------|
| Frontend  | Next.js 14, Tailwind CSS, React     |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB, Mongoose                   |
| Other     | React Hot Toast, React Icons, Axios |

---

## 📁 Project Structure

```
Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── app/
    │   ├── page.js           (Home)
    │   ├── products/         (Products listing + detail)
    │   ├── cart/             (Shopping cart)
    │   ├── checkout/         (Order form)
    │   ├── admin/            (CRUD dashboard)
    │   ├── about/
    │   └── contact/
    ├── components/
    │   ├── Navbar.js
    │   ├── Footer.js
    │   └── ProductCard.js
    ├── context/CartContext.js
    ├── lib/api.js
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (LTS)
- MongoDB Compass (local) or MongoDB Atlas (cloud)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Full-Stack-Programming-Lab.git
cd Full-Stack-Programming-Lab/Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab
```

### 2. Setup Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB URI
npm run dev
```
Backend runs at: http://localhost:5000

### 3. Seed Sample Data
Open browser and visit:
```
POST http://localhost:5000/api/products/seed/all
```
Or click "Seed Sample Data" button in Admin panel.

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

---

## 📄 Pages

| Page         | Route              | Description                        |
|--------------|--------------------|------------------------------------|
| Home         | /                  | Hero, featured/special/popular products |
| Products     | /products          | All products with category filter  |
| Product Detail | /products/[id]   | Single product with add to cart    |
| Cart         | /cart              | Shopping cart management           |
| Checkout     | /checkout          | Order placement form               |
| Admin        | /admin             | CRUD dashboard for products/orders |
| About        | /about             | Company information                |
| Contact      | /contact           | Contact form                       |

---

## 🔌 API Endpoints

### Products
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/products               | Get all (with filters)   |
| GET    | /api/products/:id           | Get single product       |
| POST   | /api/products               | Create product           |
| PUT    | /api/products/:id           | Update product           |
| DELETE | /api/products/:id           | Delete product           |
| POST   | /api/products/seed/all      | Seed sample data         |

### Orders
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| GET    | /api/orders      | Get all orders    |
| GET    | /api/orders/:id  | Get single order  |
| POST   | /api/orders      | Create order      |
| PUT    | /api/orders/:id  | Update status     |
| DELETE | /api/orders/:id  | Delete order      |

### Categories
| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| GET    | /api/categories   | Get all categories    |

---

## ✨ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Product listing with category filters
- ✅ Product detail page
- ✅ Shopping cart (with localStorage persistence)
- ✅ Checkout with order submission
- ✅ Admin CRUD dashboard (Add/Edit/Delete products)
- ✅ Order management with status updates
- ✅ Sample data seeder
- ✅ Toast notifications
- ✅ MongoDB database integration

---

*Lab 12 | Full Stack Programming | BSSE-VI | Air University FCAI Islamabad*
