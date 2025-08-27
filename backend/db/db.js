const { Pool } = require('pg');

// The dotenv config is now handled in server.js, so it is not needed here
// require('dotenv').config();

console.log("🚀 POSTGRES_URL:", process.env.POSTGRES_URL); // This should now display a URL

if (!process.env.POSTGRES_URL) {
    throw new Error("❌ POSTGRES_URL is undefined! Check your .env file.");
}

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;