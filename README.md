# 📚 Library Management API
A RESTful API built with **Express.js**, **TypeScript**, and **MongoDB** (via Mongoose) for managing a library system. This project supports book creation, updating, deletion, borrowing books, and summary reporting — all with proper validation, filtering, and business logic enforcement.

---

## 🎯 Objective
Build a full-featured Library Management System that includes:

- ✅ Schema validation using Mongoose
- ✅ Business logic enforcement (e.g., available copies control)
- ✅ Aggregation pipeline for borrow summary
- ✅ Static or instance methods in Mongoose
- ✅ Pre and post middleware usage
- ✅ Filtering and sorting features
- ✅ Clean error response structure

---
## 🚀 Features

- 📘 **Create, Read, Update, Delete (CRUD)** for books
- 🔍 **Filter, sort, and limit** books by genre or creation date
- 🧠 **Business logic** for borrowing books with availability control
- 🧮 **Aggregated summary** of total borrowed books using Mongoose aggregation
- 🛡️ **Validation** at both schema and controller level
- 🔁 Mongoose **middleware** for post-deletion logs
- 🧪 Built-in **static/instance methods** for updating availability

---

## 🛠️ Tech Stack

- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Nodemon** (for development)
- **Dotenv** (for managing environment variables)

---
## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (Atlas or local)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/library-management-api.git
cd library-management-api

# 2. Install dependencies
npm install

# 3. Create .env file in root and add:
PORT=5000
DB_NAME=your_db_username
DB_PASS=your_db_password

# 4. Start the server
npm run dev     # Development mode with nodemon
npm run build   # Compile TypeScript
npm start       # Production
