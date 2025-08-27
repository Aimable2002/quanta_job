const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Handle login at POST /admin
const pool = require('./db');
app.post('/admin', (req, res) => {
    const { username, password } = req.body;
    // Replace this with real authentication logic
    if (username === 'quanta' && password === 'quanta admin') {
        res.json({ success: true, token: 'dummy-token', user: { username: 'admin' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});


// Serve admin.html for GET /admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

const path = require('path');
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// For any route not handled by API, serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`[ROUTE] ${Object.keys(r.route.methods).join(', ').toUpperCase()} ${r.route.path}`);
    }
});

process.on('SIGINT', () => {
    console.log('Server shutting down (SIGINT)');
    process.exit();
});
process.on('SIGTERM', () => {
    console.log('Server shutting down (SIGTERM)');
    process.exit();
});
process.on('SIGHUP', () => {
    console.log('Server shutting down (SIGHUP)');
    process.exit();
});