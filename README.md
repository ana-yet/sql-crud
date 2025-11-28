# Task Manager Pro 🚀

A beautiful, modern task management application built with **Next.js 16**, **Express.js**, and **MySQL**. Features a stunning glassmorphism UI with full CRUD operations.

![Task Manager Pro](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Instant feedback on all operations
- 🌙 **Dark Theme** - Beautiful dark mode interface
- 🗄️ **MySQL Database** - Persistent data storage
- 🔄 **Status Management** - Track tasks as Pending, In Progress, or Completed

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mysql
```

### 2. Set up MySQL Database

First, make sure your MySQL server is running. Then, create the database and table:

```bash
# Login to MySQL
mysql -u root -p

# Run the database setup script (or copy-paste the SQL from server/db.sql)
source server/db.sql
```

Or manually execute:

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
```

### 3. Configure Environment Variables

Navigate to the `server` directory and update the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskmanager_db
DB_PORT=3306
PORT=5000
```

### 4. Install Dependencies

#### Backend (Express Server)

```bash
cd server
npm install
```

#### Frontend (Next.js Client)

```bash
cd ../client
npm install
```

### 5. Start the Application

You'll need two terminal windows:

#### Terminal 1 - Start Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend

```bash
cd client
npm run dev
```

The app will run on `http://localhost:3000`

### 6. Open Your Browser

Navigate to `http://localhost:3000` and start managing your tasks! 🎉

## 📁 Project Structure

```
mysql/
├── server/                 # Express Backend
│   ├── index.js           # Main server file with API routes
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables (MySQL config)
│   └── db.sql            # Database schema
│
├── client/                # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx      # Main task manager UI
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   └── page.module.css # Component styles
│   ├── package.json      # Frontend dependencies
│   └── next.config.js    # Next.js configuration
│
└── README.md             # This file
```

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/health` | Server health check |

### Example API Requests

**Create a Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "in-progress"
  }'
```

**Update a Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finished!",
    "status": "completed"
  }'
```

**Delete a Task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling

### Backend
- **Express.js** - Node.js web framework
- **MySQL2** - MySQL client for Node.js
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔧 Available Scripts

### Backend (server/)
```bash
npm start      # Start the Express server
npm run dev    # Start with nodemon (auto-restart)
```

### Frontend (client/)
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## 🐛 Troubleshooting

### MySQL Connection Issues

If you get a "Cannot connect to MySQL" error:

1. Ensure MySQL is running: `sudo service mysql status` (Linux) or check Task Manager (Windows)
2. Verify credentials in `server/.env`
3. Check if the database exists: `SHOW DATABASES;`
4. Ensure MySQL is listening on port 3306

### CORS Errors

If you encounter CORS issues:
- Ensure the backend server is running on port 5000
- Check that the frontend is making requests to `http://localhost:5000/api`

### Port Already in Use

If port 3000 or 5000 is already in use:
- Change the port in `server/.env` for backend
- Next.js will automatically prompt for an alternative port

## 🚀 Deployment

### Backend Deployment
- Deploy to **Heroku**, **Railway**, **Render**, or **AWS**
- Use **ClearDB** or **PlanetScale** for MySQL hosting
- Update environment variables in your hosting platform

### Frontend Deployment
- Deploy to **Vercel** (recommended for Next.js)
- Update API URL in production build
- Ensure environment variables are set

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js, Express, and MySQL

---

**Happy Task Managing! 📋✨**
