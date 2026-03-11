# Students Management System - Full Stack Application

A modern, responsive full-stack Students Management System built with React.js frontend and Node.js/Express backend with SQLite database.

## 📋 Features

### Frontend
- ✅ Modern, responsive UI with beautiful design
- ✅ Student List with Name, Email, Age, and Actions (Edit/Delete)
- ✅ Add Student Form with validation
  - All fields mandatory
  - Valid email format validation
  - Age validation (1-120)
- ✅ Edit Student with pre-filled data
- ✅ Delete Student with confirmation dialog
- ✅ Simulated loading states
- ✅ Excel download functionality
- ✅ Real-time error and success notifications
- ✅ Fully responsive design (mobile, tablet, desktop)

### Backend
- ✅ RESTful API with Express.js
- ✅ SQLite database for data persistence
- ✅ Complete CRUD operations
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend communication
- ✅ Automatic database initialization and seeding

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd Project
```

2. **Install and run Backend**
```bash
cd students-backend
npm install
npm start
```
Backend will run on `http://localhost:5000`

3. **Install and run Frontend (in a new terminal)**
```bash
cd students-table
npm install
npm start
```
Frontend will open on `http://localhost:3000`

## 📁 Project Structure

```
Project/
├── students-backend/        # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── students.db         # SQLite database
│   ├── package.json
│   └── node_modules/
│
└── students-table/          # React frontend
    ├── public/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── StudentForm.js
    │   │   ├── StudentList.js
    │   │   └── DeleteConfirmDialog.js
    │   ├── styles/          # Component styles
    │   ├── utils/           # Utility functions
    │   │   └── excelUtils.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── node_modules/
```

## 🔗 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get single student |
| POST | `/students` | Create new student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |
| GET | `/health` | Health check |

### Request/Response Examples

**Create Student (POST /students)**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20
}
```

**Response (201)**
```json
{
  "id": "uuid-string",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20
}
```

## 🎨 Design Features

- **Modern Gradient UI**: Beautiful gradient backgrounds and smooth animations
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Smooth Animations**: Fade-in, slide-in effects for modals and alerts
- **Interactive Elements**: Hover effects on buttons and table rows
- **Color-coded Actions**: 
  - Purple gradient for primary actions
  - Green gradient for success actions
  - Pink/Red gradient for delete actions
  - Blue gradient for edit actions

## ✅ Validation Rules

### Add/Edit Student
- **Name**: Required, non-empty string
- **Email**: Required, must be valid email format (xxx@xxx.xxx)
- **Age**: Required, must be a number between 1-120

### Error Handling
- Invalid input shows inline error messages
- API errors display in alert notifications
- Success messages auto-dismiss after 3 seconds
- Error messages auto-dismiss after 5 seconds

## 📊 Excel Export

Export student data to Excel with:
- Name, Email, Age columns
- Formatted headers
- Auto-sized columns
- All current students included

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the production version:
```bash
cd students-table
npm run build
```

2. Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

Or deploy to Netlify by connecting your GitHub repository.

### Backend Deployment (Heroku/Railway/Render)

1. Update API_BASE_URL in App.js to your backend URL
2. Deploy backend to your hosting service
3. Set environment variable if needed

## 🔧 Configuration

### Database
Database file is automatically created at `students-backend/students.db`

### API Port
Default backend port: `5000`
Change in `server.js`: `const PORT = process.env.PORT || 5000;`

### Frontend Port
Default frontend port: `3000`
If port 3000 is in use, React will ask to use port 3001

## 📦 Dependencies

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- sqlite3: ^5.1.6
- uuid: ^9.0.0

### Frontend
- react: ^18.0.0
- react-dom: ^18.0.0
- xlsx: (for Excel export)

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### Database Issues
Delete `students-backend/students.db` and restart the server to reinitialize

### CORS Errors
Ensure backend is running before starting frontend
Check that API_BASE_URL matches backend port

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check browser console for errors
- Verify API_BASE_URL in App.js is correct

## 📝 Features Implementation

- [x] Student List with CRUD operations
- [x] Form validation
- [x] Delete confirmation dialog
- [x] Loading states
- [x] Excel export
- [x] Error handling & notifications
- [x] Responsive design
- [x] Modern UI/UX
- [x] SQLite persistence
- [x] RESTful API

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

For development, both servers run in watch mode with hot reloading:
- Backend: Changes require manual restart
- Frontend: Auto-refreshes on file changes

---

**Version**: 1.0.0  
**Last Updated**: March 2026
