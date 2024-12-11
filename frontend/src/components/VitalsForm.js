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

	return (
		<form>
			<h2>Enter Your Vitals</h2>

			<div style={{ marginBottom: '15px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px',
						marginBottom: '5px',
					}}
				>
					<label>Heart Rate (bpm)</label>
					<a
						href="https://www.youtube.com/watch?v=AHHr8qNU9QY&ab_channel=HamiltonHealthSciences"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							width: '20px',
							height: '20px',
							backgroundColor: '#007BFF',
							color: 'white',
							borderRadius: '50%',
							textAlign: 'center',
							lineHeight: '20px',
							fontSize: '14px',
							fontWeight: 'bold',
							textDecoration: 'none',
							cursor: 'pointer',
						}}
					>
						i
					</a>
				</div>
				<input
					placeholder="e.g., 75"
					type="number"
					name="heartRate"
					value={formData.heartRate}
					onChange={handleChange}
					style={{ width: '100%' }}
				/>
			</div>

			<div style={{ marginBottom: '15px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px',
						marginBottom: '5px',
					}}
				>
					<label>Blood Pressure (mmHg)</label>
					<a
						href="https://www.youtube.com/watch?v=lpvyCGPsVDU&ab_channel=Drugs.com"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							width: '20px',
							height: '20px',
							backgroundColor: '#007BFF',
							color: 'white',
							borderRadius: '50%',
							textAlign: 'center',
							lineHeight: '20px',
							fontSize: '14px',
							fontWeight: 'bold',
							textDecoration: 'none',
							cursor: 'pointer',
						}}
					>
						i
					</a>
				</div>
				<input
					placeholder="e.g., 120/80"
					type="text"
					name="bloodPressure"
					value={formData.bloodPressure}
					onChange={handleChange}
					style={{ width: '100%' }}
				/>
			</div>

			<div style={{ marginBottom: '15px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px',
						marginBottom: '5px',
					}}
				>
					<label>Respiratory Rate (breaths per min)</label>
					<a
						href="https://www.youtube.com/watch?v=atm-gnobU7o&t=6s&ab_channel=EMTprep"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							width: '20px',
							height: '20px',
							backgroundColor: '#007BFF',
							color: 'white',
							borderRadius: '50%',
							textAlign: 'center',
							lineHeight: '20px',
							fontSize: '14px',
							fontWeight: 'bold',
							textDecoration: 'none',
							cursor: 'pointer',
						}}
					>
						i
					</a>
				</div>
				<input
					placeholder="e.g., 16"
					type="number"
					name="respiratoryRate"
					value={formData.respiratoryRate}
					onChange={handleChange}
					style={{ width: '100%' }}
				/>
			</div>

			<div style={{ marginBottom: '15px' }}>
				<label>Body Temperature (°F/°C)</label>
				<input
					placeholder="e.g., 98.6"
					type="number"
					name="bodyTemperature"
					value={formData.bodyTemperature}
					onChange={handleChange}
					style={{ width: '100%' }}
				/>
			</div>

			<div style={{ marginBottom: '15px' }}>
				<label>Symptoms</label>
				<textarea
					placeholder="Describe any symptoms"
					name="symptoms"
					value={formData.symptoms}
					onChange={handleChange}
					style={{ width: '100%' }}
				/>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
}

export default VitalsForm;
