const mysql = require('mysql');
require('dotenv').config({ path: '.env.local' }); // Load environment variables from .env.local

// Configure local MySQL database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;