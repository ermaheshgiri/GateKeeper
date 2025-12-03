# 🚪 Visitor Management System (MERN + Tailwind CSS)

A full-stack **Visitor Management System** built using **MERN Stack (MongoDB, Express, React, Node.js)** with secure JWT authentication, role-based access (Admin, Security, Manager, HR), visitor creation, check-in/out tracking, photo upload, and a completely modern **Tailwind CSS UI**.

This project is designed to manage visitor flow inside an organization with real-time tracking of check-in/check-out activities.

---

## 🌟 Key Features

### 🔐 Authentication
- Secure login using **JWT**
- Auto token storage
- Role-based UI access

### 👥 User Roles
- **Admin** – Full access (CRUD + view + export)
- **Security** – Check-In, Check-Out
- **Manager** – View visitors
- **HR** – View visitors

### 🧾 Visitor Management
- Add new visitors
- Auto-generate **Visitor Number (VN)**
- Store mobile, purpose, number of persons, vehicle number, etc.
- View all existing visitors in a clean UI

### 🚔 Check-In / Check-Out System
- **Check-In:**  
  - Upload or capture visitor photo  
  - Record time automatically  
  - Modern preview UI

- **Check-Out:**  
  - Auto calculate **total duration spent**  
  - Display summary on screen  

### 🎨 Frontend UI (Tailwind CSS)
- Fully responsive  
- Professional dashboard  
- Modern login page  
- Styled tables + forms  
- Loading indicators  
- Cards, badges, shadows, animations  

### 📦 Backend
- Node.js + Express REST API  
- MongoDB + Mongoose  
- Multer for photo upload  
- Clean controller-service structure  
- Input validation  

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (image upload)
- JWT
- Bcrypt
- dotenv

---

## 📁 Project Structure

