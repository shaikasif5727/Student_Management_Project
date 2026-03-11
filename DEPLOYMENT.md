# Deployment Guide

This guide will help you deploy the Students Management System to production.

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Prepare for Deployment**
```bash
cd students-table
npm run build
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with GitHub
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Update API URL**
   Before deployment, update `src/App.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy to Netlify

1. **Build the Project**
```bash
cd students-table
npm run build
```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add environment variable:
     - `REACT_APP_API_URL`: Your backend URL

4. **Update Frontend Code**
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```

## Backend Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd students-backend
   heroku create your-app-name
   ```

3. **Add Procfile**
   Create `Procfile` in students-backend/:
   ```
   web: node server.js
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **View Logs**
   ```bash
   heroku logs --tail
   ```

Backend will be available at `https://your-app-name.herokuapp.com`

### Option 2: Deploy to Railway

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "GitHub Repo"
   - Choose your repository

3. **Configure**
   - Root Directory: `students-backend`
   - Start Command: `node server.js`

4. **Deploy**
   - Railway will deploy automatically
   - Get your backend URL from the project settings

### Option 3: Deploy to Render

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure**
   - Name: `students-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Region: Choose your preferred region

4. **Deploy**
   - Click "Create Web Service"
   - Render will deploy and provide you with a URL

## Update Frontend After Backend Deployment

After deploying backend, update the API URL in frontend:

```javascript
// src/App.js
const API_BASE_URL = 'https://your-backend-url.com/api';
```

Then redeploy frontend with the updated URL.

## Environment Variables

### Backend (.env file - optional)
```
PORT=5000
NODE_ENV=production
```

### Frontend (.env file - optional)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Database Considerations

### Production Database
For production, consider:
- **PostgreSQL**: More robust than SQLite
- **MongoDB**: Cloud-based option
- **MySQL**: Traditional SQL database

To use PostgreSQL instead of SQLite:

1. Install driver:
```bash
npm install pg
```

2. Update server.js:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
```

## CORS Configuration

For production, update CORS in `server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Security Checklist

- [ ] Environment variables are not in code
- [ ] API endpoints validate all inputs
- [ ] Database credentials are in environment variables
- [ ] HTTPS is enabled on production
- [ ] CORS is properly configured
- [ ] Database is backed up regularly
- [ ] Error messages don't expose sensitive information

## Monitoring

### Heroku
```bash
heroku logs --tail
heroku metrics
```

### Railway
Monitor through dashboard at railway.app

### Render
Monitor through dashboard at render.com

## Rollback

### Vercel
- Go to Deployments
- Click on a previous deployment
- Click "Redeploy"

### Netlify
- Go to Deploys
- Click "Deploy" next to previous version

### Heroku
```bash
heroku releases
heroku releases:rollback v<version_number>
```

## Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Minify CSS/JS
   - Optimize images
   - Use lazy loading

2. **Backend**
   - Add caching headers
   - Use database indexes
   - Implement pagination for large datasets
   - Add monitoring/logging

## Scaling

As traffic increases:
- Add load balancing
- Use CDN for static files
- Database replication
- Consider microservices architecture

---

For questions or issues, refer to the main README.md
