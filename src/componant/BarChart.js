import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DashboardService from '../services/dashboardDataService';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ selectedModules }) => {

  const [data, setData] = useState([])
  const [statistiques, setStatistiques] = useState([])

  useEffect(() => {
    console.log("sele : ", selectedModules)
    const fetchData = async () => {
      const data = await DashboardService.getStatisitque()
      setStatistiques(data.statistique1)
      console.log(statistiques)
    }
    fetchData();

    console.log(statistiques)
    if (selectedModules.length > 0 && statistiques) {
      const dataSet = {
        labels: ["anger", "disgust", "fear", "happy", "neutral", "sadness", "surprise"],
        datasets: selectedModules.map(module => ({
          label: module.charAt(0).toUpperCase() + module.slice(1),
          data: statistiques[module],
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1,
        })),
      };
      setData(dataSet)
    }
  }, [selectedModules, statistiques]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permet de ne pas maintenir le ratio d'aspect
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        barPercentage: 0.9,
        categoryPercentage: 0.8,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <div style={{ flex: '1 1 45%', minWidth: '300px', maxWidth: '600px', margin: '10px' }}>
      {/* <h2>Graphique des Modules</h2> */}
      <div style={{ width: '100%', height: '400px' }}>
        {/* <Bar data={data} options={options}/> */}
      </div>
    </div >
  );
};

export default BarChart;




