# Nexus CRM — Customer Relationship Management System

A full-stack CRM built with the **MERN + Next.js** stack for the Full Stack Programming Lab Final Term Project (Air University, BSSE VI-B, Spring 2026).

It supports secure JWT authentication, full customer CRUD, live search & filtering, invoice generation with PDF download, toast notifications, and a rule-based assistant chatbot.

---

## 🧱 Tech Stack

| Layer     | Technology                                             |
|-----------|--------------------------------------------------------|
| Frontend  | Next.js 14 (App Router), React 18, Axios, react-hot-toast |
| Backend   | Node.js, Express.js                                    |
| Database  | MongoDB + Mongoose                                     |
| Auth      | JWT (jsonwebtoken) + bcryptjs password hashing         |
| Invoices  | PDFKit (server-side PDF generation)                    |

---

## 📁 Project Structure

```
Final_Term_Project_CRM/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # User, Customer, Invoice schemas
│   ├── middleware/               # JWT auth + error handling
│   ├── controllers/              # Auth, Customer, Invoice logic
│   ├── routes/                   # API route definitions
│   ├── seed/seedData.js          # Seeds demo user + 18 customers
│   └── server.js                 # Express entry point
└── frontend/
    └── src/
        ├── app/                  # Pages (login, register, dashboard…)
        ├── components/           # Sidebar, CustomerForm, Chatbot…
        ├── context/AuthContext.js
        └── lib/api.js            # Axios instance + JWT interceptor
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB — either local (`mongod`) or a free **MongoDB Atlas** cluster

### 1. Backend setup

```bash
cd backend
npm install

# Create your environment file from the example
cp .env.example .env
# Then open .env and set MONGO_URI and JWT_SECRET
```

Seed the database with a demo user and 18 sample customers:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev      # development (nodemon)
# or
npm start        # production
```

The API runs at **http://localhost:5000**.

### 2. Frontend setup

Open a **second terminal**:

```bash
cd frontend
npm install

cp .env.local.example .env.local   # sets NEXT_PUBLIC_API_URL

npm run dev
```

The app runs at **http://localhost:3000**.

### 3. Log in

Use the seeded demo account:

- **Email:** `admin@crm.com`
- **Password:** `admin123`

…or register a new account from the Register page.

---

## ✅ Requirements Mapping

| # | Module | Where it's implemented |
|---|--------|------------------------|
| I | **Authentication (JWT)** | `controllers/authController.js`, `middleware/auth.js`, password hashing in `models/User.js`, login/register pages |
| II | **Customer CRUD** | `controllers/customerController.js`, `models/Customer.js`, dashboard + customer forms (18 seeded records) |
| III | **Search & Filter** | Name/company search + status filter (Lead/Active/Inactive), live & debounced (no reload) on the dashboard |
| IV | **Next.js Frontend** | `frontend/src/app` — login/register, dashboard, forms, protected routing, reusable components, Axios integration |
| V | **Invoice Generation** | `controllers/invoiceController.js` (PDFKit), invoices page — select customer, line items, total, **download PDF** |
| VI | **Notifications** | `react-hot-toast` success/error/confirmation toasts across all actions |
| VII | **Chatbot** | `components/Chatbot.js` — rule-based commands (show customers, add customer, invoice, stats). No external AI. |
| VIII | **UI / Code Quality** | Modular structure, reusable components, consistent naming, responsive design |

---

## 🔌 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Private | Current user |
| GET | `/api/customers` | Private | List (supports `?search=` & `?status=`) |
| POST | `/api/customers` | Private | Create |
| GET | `/api/customers/:id` | Private | Get one |
| PUT | `/api/customers/:id` | Private | Update |
| DELETE | `/api/customers/:id` | Private | Delete |
| GET | `/api/customers/stats/summary` | Private | Dashboard counts |
| POST | `/api/invoices` | Private | Generate invoice |
| GET | `/api/invoices` | Private | List invoices |
| GET | `/api/invoices/:id/pdf` | Private | Download invoice PDF |

All `/customers` and `/invoices` routes are protected — requests without a valid JWT receive `401 Unauthorized`.

---

## 🤖 Chatbot Commands

Open the assistant (💬 bottom-right) and try:

- `help` — list commands
- `show customers` — go to the customer list
- `add customer` — open the add form
- `invoice` — open invoice generation
- `stats` — quick summary of customer counts

---

## 📝 Notes
- Passwords are hashed with bcrypt before storage and never returned by the API.
- Invoice totals are recalculated on the server (the client total is never trusted).
- Status values are restricted to `Lead`, `Active`, `Inactive` at the schema level.
