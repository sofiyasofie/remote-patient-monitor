const express = require('express');
const cors = require('cors');
const pool = require('./config/db');  // Import PostgreSQL connection

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// POST: Save Vitals to PostgreSQL
app.post('/api/vitals', async (req, res) => {
	const { heartRate, bloodPressure, respiratoryRate, bodyTemperature, symptoms } = req.body;

	try {
		const result = await pool.query(
			`INSERT INTO vitals 
        (heart_rate, blood_pressure, respiratory_rate, body_temperature, symptoms)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
			[heartRate, bloodPressure, respiratoryRate, bodyTemperature, symptoms]
		);

		res.status(201).json({
			message: 'Vitals stored successfully!',
			newVital: result.rows[0],
		});
	} catch (error) {
		console.error('Error saving vitals:', error);
		res.status(500).send('Server Error');
	}
});

// GET: Fetch All Vitals from PostgreSQL
app.get('/api/vitals', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM vitals ORDER BY id DESC');
		res.json(result.rows);
	} catch (error) {
		console.error('Error fetching vitals:', error);
		res.status(500).send('Server Error');
	}
});

// Start the Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
