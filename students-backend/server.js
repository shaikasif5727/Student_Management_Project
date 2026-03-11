const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const dbPath = path.join(__dirname, 'students.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize Database with Schema
function initializeDatabase() {
  db.run(
    `CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      age INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Database table created/verified');
        seedDatabase();
      }
    }
  );
}

// Seed Database with Initial Data
function seedDatabase() {
  db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
    if (err) {
      console.error('Error checking database:', err);
      return;
    }

    if (row.count === 0) {
      const students = [
        { id: 'student_001', name: 'John Doe', email: 'john@example.com', age: 20 },
        { id: 'student_002', name: 'Jane Smith', email: 'jane@example.com', age: 21 },
        { id: 'student_003', name: 'Mike Johnson', email: 'mike@example.com', age: 22 },
        { id: 'student_004', name: 'Sarah Williams', email: 'sarah@example.com', age: 20 },
        { id: 'student_005', name: 'Tom Brown', email: 'tom@example.com', age: 23 },
      ];

      students.forEach((student) => {
        db.run(
          'INSERT INTO students (id, name, email, age) VALUES (?, ?, ?, ?)',
          [student.id, student.name, student.email, student.age],
          (err) => {
            if (err) console.error('Error inserting student:', err);
          }
        );
      });

      console.log('Database seeded with initial data');
    }
  });
}

// Routes

// GET all students
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Failed to fetch students' });
      return;
    }
    res.json(rows);
  });
});

// GET single student
app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching student:', err);
      res.status(500).json({ error: 'Failed to fetch student' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(row);
  });
});

// CREATE new student
app.post('/api/students', (req, res) => {
  const { name, email, age } = req.body;

  // Validation
  if (!name || !email || !age) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (isNaN(age) || age < 1 || age > 120) {
    res.status(400).json({ error: 'Age must be a valid number between 1 and 120' });
    return;
  }

  const id = uuidv4();
  db.run(
    'INSERT INTO students (id, name, email, age) VALUES (?, ?, ?, ?)',
    [id, name, email, age],
    function (err) {
      if (err) {
        console.error('Error creating student:', err);
        res.status(500).json({ error: 'Failed to create student' });
        return;
      }
      res.status(201).json({ id, name, email, age });
    }
  );
});

// UPDATE student
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  // Validation
  if (!name || !email || !age) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (isNaN(age) || age < 1 || age > 120) {
    res.status(400).json({ error: 'Age must be a valid number between 1 and 120' });
    return;
  }

  db.run(
    'UPDATE students SET name = ?, email = ?, age = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, email, age, id],
    function (err) {
      if (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Failed to update student' });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.json({ id, name, email, age });
    }
  );
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'Failed to delete student' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) console.error('Error closing database:', err);
    console.log('Database connection closed');
    process.exit(0);
  });
});
