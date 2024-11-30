const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    sslmode: "require",
    ssl: true,
});   
 
module.exports = pool;