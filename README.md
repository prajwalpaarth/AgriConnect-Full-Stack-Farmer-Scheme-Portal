# 🌾 AgriConnect – Full-Stack Farmer Scheme Portal

> A multilingual full-stack web platform designed to help farmers discover government agricultural schemes, get personalized AI-powered assistance, and access real-time scheme information — all in one place.



## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Developer](#developer)
- [License](#license)

---

## 🧭 Overview

AgriConnect was built to solve a real problem — **farmers in India struggle to discover and access the hundreds of government schemes available to them**, largely due to language barriers, lack of awareness, and poor digital accessibility.

This platform provides:
- A **searchable, filterable scheme database** with detailed scheme pages
- A **real-time AI chatbot** powered by Ollama for personalized query resolution
- **Multilingual support** (3 languages) to remove language barriers
- A **secure admin panel** for scheme management and operations
- **Responsive UI** optimized for both mobile and desktop access

> Built under mentorship of **Prof. Disha Sen Gupta**

---

## ✨ Features

### 🗂️ Scheme Discovery
- Browse and search 100+ government agricultural schemes
- Filter by category, state, crop type, and eligibility
- Detailed scheme pages with application process, benefits, and deadlines

### 🤖 AI Chatbot (Ollama-powered)
- Real-time conversational assistant for farmer queries
- Integrated directly into scheme pages for contextual help
- Handles multilingual input and responds in the user's preferred language

### 🌐 Multilingual Support
- Full UI available in **English, Hindi, and Marathi**
- Dynamic language switching without page reload
- Scheme content translated across supported languages

### 🔐 Authentication & Security
- OAuth-based authentication using **NextAuth.js (Auth.js)**
- Secure session management with protected routes
- Role-based access: **Farmer** and **Admin**

### 🛠️ Admin Panel
- Add, edit, and delete scheme listings
- Monitor scheme engagement and usage
- Manage user roles and platform content

### 📱 Responsive Design
- Mobile-first UI built with Tailwind CSS
- Consistent rendering across all screen sizes
- Optimized API performance with clean modular architecture

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), Tailwind CSS, Axios |
| Backend | Node.js, Express.js, REST API |
| Database | MongoDB Atlas |
| Authentication | NextAuth.js (Auth.js), OAuth |
| AI Chatbot | Ollama |
| Deployment | Vercel (Frontend) · Render (Backend) · AWS |
| Tools | Git, GitHub, Postman, npm |

---

## 📁 Project Structure

```
AgriConnect/
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SchemeCard.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── pages/                  # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Schemes.jsx
│   │   │   ├── SchemeDetail.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Login.jsx
│   │   ├── context/                # Global state (language, auth)
│   │   ├── services/               # Axios API call wrappers
│   │   ├── i18n/                   # Translation files (en, hi, mr)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── vite.config.js
│
├── server/                         # Node.js + Express backend
│   ├── controllers/                # Route logic
│   │   ├── schemeController.js
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── models/                     # MongoDB Mongoose schemas
│   │   ├── Scheme.js
│   │   └── User.js
│   ├── routes/                     # API route definitions
│   │   ├── schemeRoutes.js
│   │   ├── authRoutes.js
│   │   └── chatRoutes.js
│   ├── middleware/                 # Auth middleware, error handlers
│   ├── config/                     # DB connection, env config
│   ├── .env
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or Yarn
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [Ollama](https://ollama.ai/) installed locally for AI chatbot

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/prajwalpaarth/AgriConnect-Full-Stack-Farmer-Scheme-Portal.git
cd AgriConnect-Full-Stack-Farmer-Scheme-Portal
```

**2. Install backend dependencies**
```bash
cd server
npm install
```

**3. Install frontend dependencies**
```bash
cd ../client
npm install
```

**4. Set up environment variables** (see section below)

**5. Start the backend server**
```bash
cd server
npm run dev
```

**6. Start the frontend**
```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:5000`

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
OLLAMA_BASE_URL=http://localhost:11434
```

### Frontend (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_AUTH_SECRET=your_auth_secret
```

---

## 📋 API Endpoints

### Schemes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/schemes` | Public | Get all schemes (with filters) |
| GET | `/api/schemes/:id` | Public | Get scheme by ID |
| POST | `/api/schemes` | Admin | Create new scheme |
| PUT | `/api/schemes/:id` | Admin | Update scheme |
| DELETE | `/api/schemes/:id` | Admin | Delete scheme |

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns session |
| GET | `/api/auth/session` | Public | Get current session |

### Chatbot
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/chat/query` | Public | Send query to AI chatbot |

---

## 🌍 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | 
| Backend | Render | 
| Database | MongoDB Atlas | Cloud-hosted |

---

## 👤 Developer

**Parth Mukund Moholkar**
B.E. – Artificial Intelligence & Data Science, DY Patil Institute of Technology (2023–2027)
📧 parthmoholkar999@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/paarth-moholkar-24b48a346) · [GitHub](https://github.com/prajwalpaarth)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support

If you found this project useful or interesting, consider giving it a ⭐ on GitHub — it helps others discover it!

---

<p align="center">Built with ❤️ to empower Indian farmers through technology</p>
