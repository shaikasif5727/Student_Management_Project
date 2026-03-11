@echo off
REM This script starts both the backend and frontend servers

echo =========================================
echo Students Management System - Quick Start
echo =========================================
echo.

REM Check if Node.js is installed
node --version > nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting Backend Server...
echo.

REM Start backend in a new window
start cmd /k "cd students-backend && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

echo.
echo Starting Frontend Server...
echo.

REM Start frontend in a new window
start cmd /k "cd students-table && npm start"

echo.
echo =========================================
echo Servers Starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the command windows to stop the servers.
echo =========================================
echo.
pause
