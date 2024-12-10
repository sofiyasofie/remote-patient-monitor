const express = require('express');
const cors = require('cors');
const vitals = require('./vitals');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// POST Route
app.post('/api/vitals', (req, res) => {
	const { heartRate, bloodPressure, respiratoryRate, bodyTemperature, symptoms } = req.body;

	const newVital = {
		id: vitals.length + 1,
		heartRate,
		bloodPressure,
		respiratoryRate,
		bodyTemperature,
		symptoms,
		createdAt: new Date().toISOString(),
	};

	vitals.push(newVital);
	res.status(201).json({ message: 'Vitals stored successfully!', newVital });
});

// GET Route
app.get('/api/vitals', (req, res) => {
	res.json(vitals);
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
