# Quick Start Guide - Task Manager Pro

## 🚀 Quick Setup (5 Minutes)

### Step 1: MySQL Setup

**Option A: If MySQL is already installed**
1. Open MySQL Workbench or MySQL Command Line Client
2. Execute the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS taskmanager_db;
USE taskmanager_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Add sample data
INSERT INTO tasks (title, description, status) VALUES
('Sample Task 1', 'This is a sample pending task', 'pending'),
('Sample Task 2', 'This is a sample in-progress task', 'in-progress'),
('Sample Task 3', 'This is a sample completed task', 'completed');
```

**Option B: If MySQL is not installed**
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install and remember your root password
3. Then follow Option A

### Step 2: Configure Database Connection

Edit `server/.env` file and update with your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=taskmanager_db
DB_PORT=3306
PORT=5000
```

### Step 3: Start the Backend Server

Open a terminal and run:

```bash
cd server
npm start
```

You should see:
```
✓ Connected to MySQL database
✓ Server running on http://localhost:5000
```

### Step 4: Start the Frontend

Open a **NEW** terminal and run:

```bash
cd client
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

### Step 5: Open the App

Open your browser and go to: **http://localhost:3000**

## 🎉 You're Done!

You should now see the Task Manager Pro interface. Try:
- ✅ Creating a new task
- ✏️ Editing a task
- 🗑️ Deleting a task
- 📊 Changing task status

---

## ⚠️ Troubleshooting

### "Error connecting to MySQL"
- Make sure MySQL is running (check Task Manager on Windows)
- Verify your password in `server/.env`
- Check if the database exists: `SHOW DATABASES;`

### Port already in use
- If port 5000 is taken: Change `PORT` in `server/.env`
- If port 3000 is taken: Next.js will ask if you want to use port 3001

### CORS errors
- Ensure backend is running on port 5000
- Check browser console for the actual error

---

## 📋 Manual Commands (Alternative to setup.bat)

If automated scripts don't work, run these commands manually:

```bash
# 1. Install backend dependencies
cd server
npm install

# 2. Install frontend dependencies
cd ../client
npm install

# 3. Start backend (Terminal 1)
cd ../server
npm start

# 4. Start frontend (Terminal 2 - new window)
cd ../client
npm run dev
```

---

## 🔗 Useful Links

- Backend API: http://localhost:5000/health
- Frontend App: http://localhost:3000
- API Docs: See README.md for all endpoints

---

**Need help?** Check the main README.md or open an issue!
