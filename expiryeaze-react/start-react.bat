@echo off
cd /d "%~dp0"
echo "Installing dependencies..."
npm install
echo "Starting the React development server..."
npm start 