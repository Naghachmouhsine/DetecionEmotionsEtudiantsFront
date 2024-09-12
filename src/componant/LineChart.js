import React from 'react';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { useState,useEffect } from 'react';
import DashboardService from '../services/dashboardDataService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants Chart.js requis
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({statistiques,selectedModules}) => {

 const  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Graphique des ventes sur plusieurs mois',
      },
    },
  };
  const [data, setData] = React.useState({
    labels: [],
    datasets: []
  });

   useEffect(()=>{
    // Mise à jour des données du graphique
    console.log(statistiques)
    console.log(selectedModules)
    if(selectedModules.length>0 && statistiques ){
    const newDatasets = selectedModules.map(moduleKey => ({
      label: moduleKey,
      data: statistiques[moduleKey]["indiceSatisfaction"],
      fill: false,
      borderColor: getRandomColor(), // Fonction pour générer une couleur aléatoire
      tension: 0.1,
    }));
    setData({
      labels: statistiques[selectedModules[0]] ? statistiques[selectedModules[0]]["numSeance"] : [],
      datasets: newDatasets,
    });
    }},[statistiques,selectedModules])
  // Fonction pour générer une couleur aléatoire pour chaque ligne
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ flex: '1 1 45%', minWidth: '300px', maxWidth: '600px', margin: '10px' }}>
      {/* <h2>Graphique en ligne</h2> */}

      <div style={{ width: '100%', height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
  
  };




export default LineChart;


