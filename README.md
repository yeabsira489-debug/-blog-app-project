# Blog App

A Server-Side Rendered (SSR) web application built with Node.js, Express.js, EJS, and PostgreSQL. Developed as a group assignment for our Web Programming 2 course at the American College of Technology (ACT).

## Group Members

Yeabsira Daniel 043
Lidia Addisu    170
Semiha Kedir    137
Kirubel Metaferia 022
Yeshake Assefa  046

## Features

- View all blog posts on the home page
- Click on a post to read the full content
- User registration and login system
- Logged-in users can create new posts
- Logged-in users can edit or delete their posts
- EJS partials used for reusable header and footer across all pages
- Protected routes — only logged-in users can create, edit, or delete posts
- Data stored and retrieved from PostgreSQL database

## Technologies Used

- Node.js
- Express.js
- EJS
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- cookie-parser
- dotenv
- nodemon

## Installation Steps

### 1. Clone the repository
git clone https://github.com/yeabsira489-debug/-blog-app-project.git

### 2. Install dependencies
npm install

### 3. Set up the database
CREATE DATABASE blog_db;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

### 4. Create a .env file
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=blog_db
DB_PASSWORD=yourpassword
DB_PORT=5432
JWT_SECRET=yoursecretkey

### 5. Start the server
npm run dev

Then open your browser and go to http://localhost:3000

## Project Structure

├── app.js
├── config/
│   └── db.js
├── routes/
│   ├── postRoutes.js
│   └── authRoutes.js
├── controller/
│   ├── postController.js
│   └── authController.js
├── models/
│   ├── PostModel.js
│   └── UserModel.js
├── middleware/
│   └── authMiddleware.js
├── views/
│   ├── index.ejs
│   ├── show.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── public/
    └── style.css

## GitHub Repository
https://github.com/yeabsira489-debug/-blog-app-project
