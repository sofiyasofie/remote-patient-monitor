import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function VitalsChart() {
	const [vitalsData, setVitalsData] = useState([]);

	useEffect(() => {
		// Fetch the data from the backend
		fetch('http://localhost:5001/api/vitals') // Replace with your backend URL
			.then((response) => response.json())
			.then((data) => setVitalsData(data))
			.catch((error) => console.error('Error fetching vitals data:', error));
	}, []);

	// Prepare data for the chart
	const chartData = {
		labels: vitalsData.map((vital) => new Date(vital.created_at).toLocaleString()), // Format the time
		datasets: [
			{
				label: 'Heart Rate (bpm)',
				data: vitalsData.map((vital) => vital.heart_rate),
				borderColor: 'rgba(255, 99, 132, 1)',
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				fill: true,
			},
			{
				label: 'Blood Pressure (mmHg)',
				data: vitalsData.map((vital) =>
					vital.blood_pressure ? parseInt(vital.blood_pressure.split('/')[0]) : null
				),
				borderColor: 'rgba(54, 162, 235, 1)',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				fill: true,
			},
			{
				label: 'Respiratory Rate (breaths/min)',
				data: vitalsData.map((vital) => vital.respiratory_rate),
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: true,
			},
			{
				label: 'Body Temperature (°F)',
				data: vitalsData.map((vital) => vital.body_temperature),
				borderColor: 'rgba(153, 102, 255, 1)',
				backgroundColor: 'rgba(153, 102, 255, 0.2)',
				fill: true,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
		},
	};

	return (
		<div>
			<h2>Your Vitals Chart</h2>
			<Line data={chartData} options={options} />
		</div>
	);
}

export default VitalsChart;
