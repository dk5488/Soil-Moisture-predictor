import React, { useRef } from "react";
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from "react-chartjs-2";

Chart.register(BarElement, CategoryScale, LinearScale);

function ChartComponent({ data, title }) {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.values,
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col w-full" style={{ height: '500px', marginBottom: '20px' }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;
