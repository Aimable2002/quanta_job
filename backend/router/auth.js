import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);
    
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found for username:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Invalid password for username:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    console.log('Login successful for username:', username);
    
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Register (for initial admin creation)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Registration attempt for username:', username);
    
    // Check if admin already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    // Create new admin
    admin = new Admin({ username, password });
    await admin.save();
    console.log('Admin created successfully:', admin._id);
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/verify', auth, async (req, res) => {
  try {
    res.json({ valid: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;