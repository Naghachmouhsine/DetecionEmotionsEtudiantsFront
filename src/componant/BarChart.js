// src/components/BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select'; 
// Enregistrer les composants nécessaires dans ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BarChart = (props) => {
    const allData=props.data
    console.log(props)
    let modules=[]
    Object.keys(props.data).forEach(e=>{
        modules.push({value : e,label : e})
    })
    const handleChange = (selectedOptions) => {
        setSelectedModules(selectedOptions.map(option => option.value));
        console.log(selectedModules)
        console.log(allData);
    };
    const [selectedModules, setSelectedModules] = React.useState(modules.slice(0,2).map(module=>module.value));

    const data = {
        labels : ["anger","disgust","fear","happy","neutral","sadness","surprise"],
        datasets: selectedModules.map(module => ({
            label: module.charAt(0).toUpperCase() + module.slice(1),
            data: allData[module],
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
            />
            <div style={{width : "100%", minWidth : "600px",maxWidth: "1200px", height: '500px', overflowX: 'auto' }}>
                <Bar data={data} options={options} />
            </div>

        </div>
    );
};

export default BarChart;




