const { Pool } = require('pg');

// PostgreSQL Connection
const pool = new Pool({
	user: 'postgres',            // Your PostgreSQL username
	host: 'localhost',           // Database host
	database: 'vitalsdb',        // Database name
	password: 'your_password',   // PostgreSQL password
	port: 5432,                  // Default PostgreSQL port
});

module.exports = pool;
