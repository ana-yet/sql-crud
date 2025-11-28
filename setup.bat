@echo off
echo ================================
echo Task Manager Pro - Setup Guide
echo ================================
echo.
echo This script will help you set up the Task Manager application.
echo.
echo Prerequisites:
echo   1. MySQL must be installed and running
echo   2. Node.js must be installed
echo.
echo ================================
echo Step 1: Database Setup
echo ================================
echo.
echo Please run the following command in MySQL:
echo.
echo   mysql -u root -p
echo   source server/db.sql
echo.
echo Or manually create the database using the SQL in server/db.sql
echo.
pause
echo.
echo ================================
echo Step 2: Configure Environment
echo ================================
echo.
echo Please edit server/.env file with your MySQL credentials:
echo   DB_USER=root
echo   DB_PASSWORD=your_password
echo   DB_NAME=taskmanager_db
echo.
pause
echo.
echo ================================
echo Step 3: Install Dependencies
echo ================================
echo.
echo Installing backend dependencies...
cd server
call npm install
echo.
echo Installing frontend dependencies...
cd ..\client
call npm install
cd ..
echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo To start the application, run:
echo   1. In terminal 1: cd server && npm start
echo   2. In terminal 2: cd client && npm run dev
echo   3. Open http://localhost:3000 in your browser
echo.
pause
