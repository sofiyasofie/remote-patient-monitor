import React, { useState } from 'react';
import axios from 'axios';

function VitalsForm() {
	const [formData, setFormData] = useState({
		heartRate: '',
		bloodPressure: '',
		respiratoryRate: '',
		bodyTemperature: '',
		symptoms: '',
	});

	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5001/api/vitals', formData);
			setMessage(response.data.message);
			setFormData({
				heartRate: '',
				bloodPressure: '',
				respiratoryRate: '',
				bodyTemperature: '',
				symptoms: '',
			});
		} catch (error) {
			console.error('Error submitting vitals:', error);
			setMessage('Failed to submit vitals.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Enter Your Vitals</h2>
			{message && <p>{message}</p>}

			<label>Heart Rate (bpm)</label>
			<input
				type="number"
				name="heartRate"
				value={formData.heartRate}
				onChange={handleChange}
			/>

			<label>Blood Pressure (mmHg)</label>
			<input
				type="text"
				name="bloodPressure"
				value={formData.bloodPressure}
				onChange={handleChange}
			/>

			<label>Respiratory Rate (breaths per min)</label>
			<input
				type="number"
				name="respiratoryRate"
				value={formData.respiratoryRate}
				onChange={handleChange}
			/>

			<label>Body Temperature (°F)</label>
			<input
				type="number"
				name="bodyTemperature"
				value={formData.bodyTemperature}
				onChange={handleChange}
			/>

			<label>Symptoms</label>
			<textarea
				name="symptoms"
				value={formData.symptoms}
				onChange={handleChange}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}

export default VitalsForm;
