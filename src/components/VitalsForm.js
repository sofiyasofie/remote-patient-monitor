import React, { useState } from 'react';

function VitalsForm() {
	const [formData, setFormData] = useState({
		heartRate: '',
		bloodPressure: '',
		respiratoryRate: '',
		bodyTemperature: '',
		symptoms: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Vitals Submitted:', formData);
		alert('Vitals submitted successfully!');
		setFormData({
			heartRate: '',
			bloodPressure: '',
			respiratoryRate: '',
			bodyTemperature: '',
			symptoms: '',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Enter Your Vitals</h2>

			<label>Heart Rate (bpm)</label>
			<input
				type="number"
				name="heartRate"
				placeholder="e.g., 75"
				value={formData.heartRate}
				onChange={handleChange}
			/>

			<label>Blood Pressure (mmHg)</label>
			<input
				type="text"
				name="bloodPressure"
				placeholder="e.g., 120/80"
				value={formData.bloodPressure}
				onChange={handleChange}
			/>

			<label>Respiratory Rate (breaths per minute)</label>
			<input
				type="number"
				name="respiratoryRate"
				placeholder="e.g., 16"
				value={formData.respiratoryRate}
				onChange={handleChange}
			/>

			<label>Body Temperature (°F/°C)</label>
			<input
				type="number"
				name="bodyTemperature"
				placeholder="e.g., 98.6"
				value={formData.bodyTemperature}
				onChange={handleChange}
			/>

			<label>Symptoms</label>
			<textarea
				name="symptoms"
				placeholder="Describe any symptoms you have"
				value={formData.symptoms}
				onChange={handleChange}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}

export default VitalsForm;
