import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Use fallback secret if JWT_SECRET is not set
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    
    const decoded = jwt.verify(token, jwtSecret);
    req.admin = await Admin.findById(decoded.id).select('-password');
    
    if (!req.admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;