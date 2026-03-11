# Setup Guide - Students Management System

## Prerequisites

Make sure you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/)

To verify installation:
```bash
node --version
npm --version
```

## Installation Steps

### Step 1: Extract/Clone the Project
```bash
cd C:\Users\mahir\Desktop\Project
```

### Step 2: Install Backend Dependencies
```bash
cd students-backend
npm install
```

Expected output: `added XXX packages`

### Step 3: Install Frontend Dependencies
```bash
cd ../students-table
npm install
```

Expected output: `added XXX packages`

### Step 4: Start Backend Server

Open a terminal/command prompt and run:
```bash
cd students-backend
npm start
```

You should see:
```
Backend server is running on http://localhost:5000
API available at http://localhost:5000/api
Connected to SQLite database
Database table created/verified
Database seeded with initial data
```

### Step 5: Start Frontend Server

Open another terminal/command prompt and run:
```bash
cd students-table
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

### Quick Method: Use start-servers.bat (Windows Only)
Simply double-click `start-servers.bat` in the Project folder to start both servers automatically.

## First Usage

1. **View Students**: You'll see 3 sample students already in the database
2. **Add a Student**: Click "Add New Student" button
3. **Fill the Form**: 
   - Name: Any name
   - Email: Valid email format (name@domain.com)
   - Age: Number between 1-120
4. **Submit**: Click "Add Student"
5. **Edit**: Click Edit button on any student
6. **Delete**: Click Delete button and confirm
7. **Export**: Click "Export to Excel" to download student data

## Verify Everything is Working

### Backend Health Check
Open in browser: `http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "Backend is running"
}
```

### Frontend
Open in browser: `http://localhost:3000`

You should see:
- Header with "📚 Students Management System"
- List of students
- "Add New Student" button
- "Export to Excel" button

## Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install` in both folders

### Issue: Port 5000 or 3000 is already in use
**Solution**: Kill the process using that port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use
npx kill-port 5000
npx kill-port 3000
```

### Issue: "npm: command not found"
**Solution**: Node.js or npm is not installed properly
- Reinstall Node.js from nodejs.org
- Restart your computer after installation

### Issue: Database errors
**Solution**: Delete `students-backend/students.db` and restart server
The database will be recreated automatically

### Issue: Frontend shows "Cannot connect to backend"
**Solution**: 
- Make sure backend is running on port 5000
- Check browser console (F12 → Console tab)
- Verify API_BASE_URL in src/App.js is correct

### Issue: Form validation errors
**Solution**: Make sure to enter valid data:
- Name: Not empty
- Email: Valid format (xxx@xxx.xxx)
- Age: Number between 1 and 120

## Project Structure

```
students-table/
├── public/
├── src/
│   ├── components/
│   │   ├── StudentForm.js
│   │   ├── StudentList.js
│   │   ├── DeleteConfirmDialog.js
│   ├── styles/
│   │   ├── StudentForm.css
│   │   ├── StudentList.css
│   │   ├── DeleteConfirmDialog.css
│   ├── utils/
│   │   └── excelUtils.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json

students-backend/
├── server.js
├── students.db (auto-created)
└── package.json
```

## Configuration Files

### Backend - server.js
- Port: 5000 (change: `const PORT = 5000;`)
- Database: SQLite (students.db)
- CORS: Enabled for all origins

### Frontend - src/App.js
- API URL: `http://localhost:5000/api`
- Port: 3000 (automatic fallback to 3001 if in use)

## Development Tips

### Live Reload
- **Backend**: Requires manual restart when code changes
- **Frontend**: Auto-refreshes when files change

### Browser DevTools
Open DevTools (F12) to:
- Check Network tab for API calls
- Check Console for errors
- Inspect Elements
- Debug JavaScript

### API Testing
Test API endpoints using Postman or curl:
```bash
# Get all students
curl http://localhost:5000/api/students

# Add a student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test\", \"email\": \"test@example.com\", \"age\": 25}"

# Update a student
curl -X PUT http://localhost:5000/api/students/student_001 \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Updated\", \"email\": \"updated@example.com\", \"age\": 26}"

# Delete a student
curl -X DELETE http://localhost:5000/api/students/student_001
```

## Next Steps

1. **Customize**: Modify colors, fonts, or add features
2. **Deploy**: Follow DEPLOYMENT.md for production setup
3. **Database**: Consider PostgreSQL for production
4. **Authentication**: Add login/role management
5. **Pagination**: Add pagination for large datasets
6. **Search/Filter**: Add search functionality

## Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [SQLite Documentation](https://www.sqlite.org)
- [Node.js Documentation](https://nodejs.org/docs)

## Getting Help

1. Check the browser console for errors (F12)
2. Check terminal output for backend errors
3. Verify all npm packages are installed
4. Ensure Node.js version is 14 or higher
5. Restart both servers

---

**Version**: 1.0.0
**Last Updated**: March 2026
