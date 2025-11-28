const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskmanager_db',
  port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('✓ Connected to MySQL database');


// creating table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err);
    } else {
      console.log('✓ Tasks table checked/created successfully');
    }
  });
});

// API Routes

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json(results);
  });
});

// GET single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).json({ error: 'Failed to fetch task' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(results[0]);
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const query = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  const taskStatus = status || 'pending';

  db.query(query, [title, description, taskStatus], (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ error: 'Failed to create task' });
    }

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      status: taskStatus,
      message: 'Task created successfully'
    });
  });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';

  db.query(query, [title, description, status, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ error: 'Failed to update task' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      id: parseInt(id),
      title,
      description,
      status,
      message: 'Task updated successfully'
    });
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
