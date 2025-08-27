
const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Dummy admin login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Replace this with real authentication logic
    if (username === 'quanta' && password === 'quanta admin') {
        res.json({ success: true, token: 'dummy-token', user: { username: 'admin' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Authenticated contacts fetch for admin dashboard
router.get('/contacts', (req, res) => {
    // Simple token check (dummy, for demo)
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    pool.query('SELECT * FROM contacts ORDER BY created_at DESC')
        .then(result => {
            res.json({ success: true, contacts: result.rows });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ success: false, error: 'Server error' });
        });
});

// Delete all contacts
router.delete('/contacts', async (req, res) => {
    // Simple token check (dummy, for demo)
    const authHeader = req.headers['authorization'];
    console.log('DELETE /contacts Authorization:', authHeader);
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const result = await pool.query('DELETE FROM contacts');
        res.json({ success: true, deletedCount: result.rowCount });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
    // Simple token check (dummy, for demo)
    const authHeader = req.headers['authorization'];
    console.log('DELETE /contacts/:id Authorization:', authHeader);
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const contactId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM contacts WHERE id = $1', [contactId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;