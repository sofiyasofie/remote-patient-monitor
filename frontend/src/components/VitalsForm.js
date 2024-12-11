import React, { useState, useEffect } from "react";
import axios from "axios";

function VitalsForm() {
	const [vitals, setVitals] = useState([]);
	const [formData, setFormData] = useState({
		heartRate: "",
		bloodPressure: "",
		respiratoryRate: "",
		bodyTemperature: "",
		symptoms: "",
	});

	// Fetch vitals from the backend
	useEffect(() => {
		const fetchVitals = async () => {
			try {
				const response = await axios.get("http://localhost:5001/api/vitals");
				setVitals(response.data);
			} catch (error) {
				console.error("Error fetching vitals:", error);
			}
		};
		fetchVitals();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Validate input values
	const validateInputs = () => {
		const { heartRate, bloodPressure, respiratoryRate, bodyTemperature } = formData;

		const parsedHeartRate = parseInt(heartRate, 10);
		const parsedRespiratoryRate = parseInt(respiratoryRate, 10);
		const parsedBodyTemperature = parseFloat(bodyTemperature);

		if (isNaN(parsedHeartRate) || parsedHeartRate < 40 || parsedHeartRate > 180) {
			alert("Heart rate must be a number between 40 and 180 bpm.");
			return false;
		}

		const bloodPressureRegex = /^\d{2,3}\/\d{2,3}$/;
		if (!bloodPressureRegex.test(bloodPressure)) {
			alert("Blood pressure must be in the format 'number/number' (e.g., 120/80).");
			return false;
		}

		const [systolic, diastolic] = bloodPressure.split("/").map(Number);
		if (
			isNaN(systolic) ||
			isNaN(diastolic) ||
			systolic < 80 ||
			systolic > 200 ||
			diastolic < 40 ||
			diastolic > 120
		) {
			alert(
				"Blood pressure values are out of range. Systolic should be 80-200 and diastolic should be 40-120."
			);
			return false;
		}

		if (isNaN(parsedRespiratoryRate) || parsedRespiratoryRate < 8 || parsedRespiratoryRate > 40) {
			alert("Respiratory rate must be a number between 8 and 40 breaths per minute.");
			return false;
		}

		if (isNaN(parsedBodyTemperature) || parsedBodyTemperature < 95 || parsedBodyTemperature > 105) {
			alert("Body temperature must be a number between 95.0°F and 105.0°F.");
			return false;
		}

		return true;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateInputs()) return;

		try {
			const response = await axios.post("http://localhost:5001/api/vitals", formData);
			setVitals([response.data.newVital, ...vitals]);
			setFormData({
				heartRate: "",
				bloodPressure: "",
				respiratoryRate: "",
				bodyTemperature: "",
				symptoms: "",
			});
		} catch (error) {
			console.error("Error saving vitals:", error);
		}
	};

	// Helper function to determine cell background color
	const getCellStyle = (value, type) => {
		let isNormal = false;

		switch (type) {
			case "heartRate":
				isNormal = value >= 60 && value <= 100;
				break;
			case "bloodPressure":
				const [systolic, diastolic] = value.split("/").map(Number);
				isNormal = systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80;
				break;
			case "respiratoryRate":
				isNormal = value >= 12 && value <= 20;
				break;
			case "bodyTemperature":
				isNormal = value >= 97.0 && value <= 99.0;
				break;
			default:
				isNormal = true;
		}

		return {
			backgroundColor: isNormal ? "lightgreen" : "lightcoral",
		};
	};

	return (
		<div style={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}>
			{/* Form Section */}
			<div>
				<h2>Enter Your Vitals</h2>
				<form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
					<div>
						<label>
							Heart Rate (bpm)
							<input
								type="number"
								placeholder="e.g., 75"
								name="heartRate"
								value={formData.heartRate}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Blood Pressure (mmHg)
							<input
								type="text"
								placeholder="e.g., 120/80"
								name="bloodPressure"
								value={formData.bloodPressure}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Respiratory Rate (breaths per min)
							<input
								type="number"
								placeholder="e.g., 16"
								name="respiratoryRate"
								value={formData.respiratoryRate}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Body Temperature (°F/°C)
							<input
								type="number"
								placeholder="e.g., 98.6"
								name="bodyTemperature"
								value={formData.bodyTemperature}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Symptoms
							<textarea
								placeholder="Describe any symptoms"
								name="symptoms"
								value={formData.symptoms}
								onChange={handleChange}
								rows="4"
							></textarea>
						</label>
					</div>
					<button type="submit">Submit</button>
					<button type="submit">Send to your doctor</button>
				</form>
			</div>

			{/* Table Section */}
			<div style={{ maxWidth: "600px", overflowX: "auto" }}>
				<h2>Your Vitals</h2>
				<table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
					<thead>
						<tr>
							<th>Time</th>
							<th>Heart Rate</th>
							<th>Blood Pressure</th>
							<th>Respiratory Rate</th>
							<th>Body Temperature</th>
							<th>Symptoms</th>
						</tr>
					</thead>
					<tbody>
						{vitals.length === 0 ? (
							<tr>
								<td colSpan="6" style={{ textAlign: "center" }}>
									No vitals recorded yet.
								</td>
							</tr>
						) : (
							vitals.map((vital) => (
								<tr key={vital.id}>
									<td>{new Date(vital.created_at).toLocaleString()}</td>
									<td style={getCellStyle(vital.heart_rate, "heartRate")}>
										{vital.heart_rate}
									</td>
									<td style={getCellStyle(vital.blood_pressure, "bloodPressure")}>
										{vital.blood_pressure}
									</td>
									<td style={getCellStyle(vital.respiratory_rate, "respiratoryRate")}>
										{vital.respiratory_rate}
									</td>
									<td style={getCellStyle(vital.body_temperature, "bodyTemperature")}>
										{vital.body_temperature}
									</td>
									<td>{vital.symptoms}</td>
								</tr>
							))
						)}
					</tbody>
				</table>

				{/* Normal Ranges Box */}
				<div
					style={{
						marginTop: "10px",
						fontSize: "0.85em",
						color: "#555",
						lineHeight: "1.5",
					}}
				>
					<h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>Normal Ranges:</h4>
					<p>
						<b>Heart Rate:</b> 60-100 bpm <br />
						<b>Blood Pressure:</b> 90/60 - 120/80 mmHg <br />
						<b>Respiratory Rate:</b> 12-20 breaths/min <br />
						<b>Body Temperature:</b> 97.0-99.0 °F (36.1-37.2 °C)
					</p>
				</div>
			</div>
		</div>
	);
}

export default VitalsForm;
