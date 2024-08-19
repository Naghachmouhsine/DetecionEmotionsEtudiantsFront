// src/components/BarChart.js

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select'; 
import DashboardService from '../services/dashboardDataService';
// Enregistrer les composants nécessaires dans ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const styleSelect = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#4CAF50' : '#fff',
          color: state.isSelected ? '#fff' : '#000',
          padding: 10,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }),
        control: (provided) => ({
          ...provided,
          borderColor: '#4CAF50',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#4CAF50',
          },
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#4CAF50',
          color: '#fff',
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#fff',
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#388E3C',
            color: 'white',
          },
        }),
    };

    const [statistique,setStatistique]=useState(null)
    const [user,setUser]=useState(null)

    useEffect(() => {
        const userS = JSON.parse(localStorage.getItem("user"));
        setUser(userS); // Mettez à jour l'état user
        console.log(userS); // Utilisez userS ici
      
        const fetchStatistiques = async () => {
          try {
            const data = await DashboardService.getStatisitque(userS.id); // Utilisez userS ici
            setStatistique(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
          }
        };
      
        fetchStatistiques();
      }, []); 
      
    
      let modules=[]
    if(statistique!=null) {  
    Object.keys(statistique).forEach(e=>{
        modules.push({value : e,label : e})
    })
    }
    const handleChange = (selectedOptions) => {
        setSelectedModules(selectedOptions.map(option => option.value));
        console.log(selectedModules)
        // console.log(allData);
    };
    const [selectedModules, setSelectedModules] = React.useState(modules.slice(0,2).map(module=>module.value));

    const data = {
        labels : ["anger","disgust","fear","happy","neutral","sadness","surprise"],
        datasets: selectedModules.map(module => ({
            label: module.charAt(0).toUpperCase() + module.slice(1),
            data: statistique[module],
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
        })),
    };
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
        <div style={{ width: '100%'}}>
            <h2>Graphique des Modules</h2>
            <Select
                isMulti
                options={modules}
                onChange={handleChange}
                placeholder="Sélectionnez les modules"
                styles={styleSelect}
            />
            <div style={{width : "100%", minWidth : "600px",maxWidth: "1200px", height: '500px', overflowX: 'auto' }}>
                <Bar data={data} options={options} />
            </div>

        </div>
    );
};

export default BarChart;




