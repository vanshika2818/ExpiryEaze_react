# 🔧 Troubleshooting Guide

## If the app won't start or shows errors:

### 1. Check if port 3001 is available:
```bash
netstat -ano | findstr :3001
```

### 2. Kill any process using port 3001:
```bash
taskkill /PID <PID_NUMBER> /F
```

### 3. Clear npm cache:
```bash
npm cache clean --force
```

### 4. Delete node_modules and reinstall:
```bash
rmdir /s node_modules
del package-lock.json
npm install
```

### 5. Start the app:
```bash
npm start
```

## Test URLs:

- **Main App**: http://localhost:3001
- **Test Page**: http://localhost:3001/test
- **Home Page**: http://localhost:3001/
- **Login**: http://localhost:3001/auth/login

## Common Issues:

### "Site can't be reached"
- Make sure the server is running (you should see "Compiled successfully!")
- Check if port 3001 is not blocked by firewall
- Try accessing http://127.0.0.1:3001 instead of localhost

### "Module not found" errors
- Run `npm install` to install missing dependencies
- Check if all files are present in src/pages/ and src/components/

### "Port already in use"
- The app is configured to use port 3001
- If still having issues, change the port in package.json

## Quick Fix Commands:

```bash
# Stop any running processes
taskkill /f /im node.exe

# Clear and reinstall
npm cache clean --force
rmdir /s node_modules
npm install

# Start fresh
npm start
``` 