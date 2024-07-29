import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title);

const HealthMetricsVisualizer: React.FC = () => {
  const [weight, setWeight] = useState<number>(70); // Default weight
  const [height, setHeight] = useState<number>(170); // Default height

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [weight, weight + 1, weight + 2, weight + 1, weight],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
      {
        label: 'Height (cm)',
        data: [height, height + 1, height + 2, height + 1, height],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Health Metrics Visualizer</h2>
      <div className="mb-4">
        <label htmlFor="weight" className="block text-gray-700">Weight (kg):</label>
        <input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="height" className="block text-gray-700">Height (cm):</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <Line data={data} />
    </div>
  );
};

export default HealthMetricsVisualizer;
