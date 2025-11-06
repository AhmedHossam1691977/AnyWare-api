# 📦 API Project

A modern and secure RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
The project includes authentication, validation, security middlewares, and clean modular structure.

---

## Features

   **Authentication System** (JWT-based)
  **Password Hashing** using bcrypt
 **Request Validation** with Joi
 **Secure Middleware Stack**:
   `helmet` for security headers
   `hpp` to prevent HTTP Parameter Pollution
  `express-rate-limit` to prevent brute-force attacks
   `xss-clean` & `express-xss-sanitizer` to prevent XSS attacks
   `cors` for Cross-Origin Resource Sharing
   **MongoDB Integration** via Mongoose
  **Environment Variables** using dotenv
  **Auto Reload** with nodemon (for development)
  **Modular Folder Structure** (Controllers, Routes, Models, Middleware)

---

## Technologies Used

| Package | Purpose |
|----------|----------|
| **express** | HTTP server framework |
| **mongoose** | MongoDB ODM |
| **jsonwebtoken** | Authentication tokens |
| **bcrypt** | Password hashing |
| **dotenv** | Manage environment variables |
| **joi** | Input validation |
| **helmet**, **hpp**, **cors**, **xss**, **express-xss-sanitizer** | Security middlewares |
| **express-rate-limit** | Limit repeated requests |
| **nodemon** | Auto server reload in development |

---

## 🗂 Folder Structure
