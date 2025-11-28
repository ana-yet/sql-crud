-- Create database
CREATE DATABASE IF NOT EXISTS taskmanager_db;

-- Use the database
USE taskmanager_db;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO tasks (title, description, status) VALUES
('Sample Task 1', 'This is a sample pending task', 'pending'),
('Sample Task 2', 'This is a sample in-progress task', 'in-progress'),
('Sample Task 3', 'This is a sample completed task', 'completed');
