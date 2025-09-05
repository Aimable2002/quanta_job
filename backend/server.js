import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';
import connectDB from "./db/db.js";
import authRoutes from './router/auth.js'
import contactRoutes from './router/contact.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});