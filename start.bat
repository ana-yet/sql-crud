@echo off
echo Starting Task Manager Pro Backend Server...
echo.
cd server
start cmd /k "npm start"
echo Backend server starting on http://localhost:5000
echo.
timeout /t 3 /nobreak > nul
echo Starting Task Manager Pro Frontend...
echo.
cd ..\client
start cmd /k "npm run dev"
echo.
echo ================================
echo Task Manager Pro is starting!
echo ================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
