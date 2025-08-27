const express = require('express');
const router = express.Router();
const pool = require('../db/db');


// GET all contacts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json({ success: true, contacts: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// POST a new contact
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, subject, message]
        );
        res.status(201).json({ success: true, contact: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
// GET contacts created today
router.get('/today', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM contacts
            WHERE created_at::date = CURRENT_DATE
            ORDER BY created_at DESC
        `);
        res.json({ success: true, contacts: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// GET contacts created this week
router.get('/week', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM contacts
            WHERE date_trunc('week', created_at) = date_trunc('week', CURRENT_DATE)
            ORDER BY created_at DESC
        `);
        res.json({ success: true, contacts: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;