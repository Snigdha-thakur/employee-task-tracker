-- Employee Task Tracker Database Schema
-- This file contains the database schema for the employee task tracker application

-- Create tables and define schema here
-- Employees table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(100),
    department VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, in-progress, completed
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
    assigned_to INTEGER,
    due_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES employees(id) ON DELETE SET NULL
);

-- Sample data with Indian names
INSERT INTO employees (name, email, position, department) VALUES
('Rajesh Kumar', 'rajesh.kumar@company.com', 'Software Developer', 'Engineering'),
('Priya Sharma', 'priya.sharma@company.com', 'Product Manager', 'Product'),
('Amit Patel', 'amit.patel@company.com', 'UX Designer', 'Design'),
('Sunita Singh', 'sunita.singh@company.com', 'QA Engineer', 'Engineering'),
('Vikram Joshi', 'vikram.joshi@company.com', 'Frontend Developer', 'Engineering'),
('Anjali Gupta', 'anjali.gupta@company.com', 'Backend Developer', 'Engineering'),
('Sanjay Mehta', 'sanjay.mehta@company.com', 'DevOps Engineer', 'Infrastructure'),
('Neha Reddy', 'neha.reddy@company.com', 'Data Analyst', 'Analytics');

INSERT INTO tasks (title, description, status, priority, assigned_to, due_date) VALUES
('Implement user authentication', 'Add login and registration functionality with JWT tokens', 'in-progress', 'high', 1, '2024-02-15'),
('Design dashboard mockups', 'Create wireframes and mockups for the main dashboard', 'pending', 'medium', 3, '2024-02-20'),
('API documentation', 'Document all backend endpoints with examples', 'completed', 'low', 1, '2024-02-10'),
('User testing session', 'Conduct usability tests with 5 participants', 'pending', 'high', 2, '2024-02-25'),
('Database optimization', 'Optimize queries and add indexes for better performance', 'in-progress', 'medium', 1, '2024-02-28'),
('Mobile responsive design', 'Ensure all pages work well on mobile devices', 'pending', 'medium', 3, '2024-03-01'),
('Payment gateway integration', 'Integrate Razorpay payment gateway', 'pending', 'high', 5, '2024-02-18'),
('Performance testing', 'Conduct load testing on the application', 'in-progress', 'medium', 4, '2024-02-22'),
('Security audit', 'Perform security vulnerability assessment', 'pending', 'high', 6, '2024-03-05'),
('CI/CD pipeline setup', 'Set up automated deployment pipeline', 'completed', 'medium', 7, '2024-02-08'),
('Data visualization charts', 'Create interactive charts for analytics dashboard', 'in-progress', 'medium', 8, '2024-02-27'),
('Multi-language support', 'Add Hindi and other regional language support', 'pending', 'low', 5, '2024-03-10');