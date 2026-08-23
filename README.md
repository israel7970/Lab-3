# Full-Stack Counter App

A full-stack web application featuring user authentication and session management, built with Node.js, Express.js, and MySQL.

## 📋 Overview

This project implements a counter application with secure user registration and login. It was built to practice full-stack architecture, session handling, and authentication best practices from the ground up.

## ✨ Features

- User registration and login system
- Session-based authentication
- Passwords secured with industry-standard hashing and salting
- Persistent data storage using MySQL

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth/Security:** Password hashing & salting (bcrypt)

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/israel7970/full-stack-counter-app.git
cd full-stack-counter-app

# Install dependencies
npm install

# Set up environment variables (create a .env file)
# DB_HOST=localhost
# DB_USER=your_mysql_user
# DB_PASSWORD=your_mysql_password
# DB_NAME=your_database_name
# SESSION_SECRET=your_session_secret

# Set up the MySQL database
# Import the schema (adjust filename to match your project)
mysql -u your_user -p your_database < schema.sql

# Start the server
npm start
```

The app should now be running at `http://localhost:3000` (or your configured port).

## 📸 Screenshots

<img width="890" height="240" alt="image" src="https://github.com/user-attachments/assets/4f8b7d2e-5cb8-4885-bbe6-cdb433145703" />


## 📌 Notes

Built as a hands-on project to strengthen full-stack development fundamentals, particularly around authentication and session management.
