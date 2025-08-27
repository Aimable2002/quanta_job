const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// PostgreSQL pool
const pool = require('./db/db');

// Login Route
app.post('/admin', (req, res) => {
    const { username, password } = req.body;
    if (username === 'quanta' && password === 'quanta admin') {
        res.json({ success: true, token: 'dummy-token', user: { username: 'admin' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// API Routes
const contactRoutes = require('./router/contact');
const adminRoutes = require('./router/admin');
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 👉 Serve Vite build (from react_project/dist/)
app.use(express.static(path.join(__dirname, '../dist')));

// 👉 Handle direct URL access (SPA fallback to index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
