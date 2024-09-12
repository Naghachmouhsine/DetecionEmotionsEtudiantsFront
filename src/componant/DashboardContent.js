import React, { Component } from 'react';
import Select from 'react-select';
import DashboardService from '../services/dashboardDataService';
import { Chart, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

// Enregistrer les éléments dans Chart.js
Chart.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
export default class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistique1: {},
      statistique2: {},
      modules: [],
      userS: null,
      selectedModul: [],
      data1: {
        labels: [], // Remplace par tes propres labels
        datasets: [
          {
            label: '',
            data: [], // Aucun point de donnée
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optionnel, si tu veux rendre visible les barres avec des couleurs claires
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
          }
        ],
      },
      data2: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            fill: false, // Pas de remplissage sous la ligne
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.1,
          }
        ]
      }
    };
    this.styleSelect = {
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
    this.options1 = {
      responsive: true,
      maintainAspectRatio: false, // Permet de ne pas maintenir le ratio d'aspect
      plugins: {
        title: {
          display: true,  // Affiche le titre
          text: 'Répartition des Émotions par Module',  // Le texte du titre
          font: {
            size: 18,  // Taille de la police du titre
            weight: 'bold'  // Style de la police (gras ici)
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
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
    this.options2 = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Indice de Satisfaction par Séance ',
          font: {
            size: 18,  // Taille de la police du titre
            weight: 'bold'  // Style de la police (gras ici)
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
      },
    };
  }

  async componentDidMount() {
    console.log("Composant monté");
    // try {
    const data = await DashboardService.getStatisitque();
    const modules = data.statistique1 ? Object.keys(data.statistique1).map(e => ({ value: e, label: e })) : [];
    let sta2 = {}
    for (let module in data.statistique2) {
      sta2[module] = {}
      sta2[module]["indiceSatisfaction"] = data.statistique2[module]["indiceSatisfaction"]
      sta2[module]["numSeance"] = data.statistique2[module]["numSeance"].map(e => "seance " + String(e))
    }
    this.setState({
      statistique1: data.statistique1,
      statistique2: sta2,
      modules: modules
    });
    // } catch (error) {
    //   console.error("Erreur lors de la récupération des statistiques:", error);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedModul !== this.state.selectedModul) {

      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      if (this.state.selectedModul.length > 0) {

        if (this.state.statistique1) {
          const data = {
            labels: ["anger", "disgust", "fear", "happy", "neutral", "sadness", "surprise"],
            datasets:
              this.state.selectedModul.map(module => ({
                label: module.charAt(0).toUpperCase() + module.slice(1),
                data: this.state.statistique1[module],  // Vérifie que statistiques[module] est défini
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                borderWidth: 1,
              }))
          }
          this.setState({ data1: data })
        }
        if (this.state.statistique2) {
          const data2 = {
            labels: Array.from(new Set(Object.values(this.state.statistique2).flatMap(module => module.numSeance))),
            datasets: this.state.selectedModul.map(module => (
              {
                label: module.charAt(0).toUpperCase() + module.slice(1),
                data: this.state.statistique2[module]["indiceSatisfaction"],  // Vérifie que statistiques[module] est défini
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                tension: 0.1,
              }
            ))
          }
          this.setState({ data2: data2 })
        }
      }
    }
    console.log(this.state)
  }


  handleChange = (selectedOptions) => {
    console.log(selectedOptions)
    const selectedModul = selectedOptions ? selectedOptions.map(option => option.value) : [];
    this.setState({ selectedModul: selectedModul });
  }
  render() {

    return (
      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>
        <Select
          isMulti
          options={this.state.modules}
          onChange={this.handleChange}
          placeholder="Sélectionnez les modules"
          styles={this.styleSelect}
        />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 45%', minWidth: '300px', maxWidth: '600px', margin: '10px' }}>
            <div style={{ width: '100%', height: '400px' }}>
              <Bar data={this.state.data1} options={this.options1} />
            </div>
          </div >
          <div style={{ flex: '1 1 45%', minWidth: '300px', maxWidth: '600px', margin: '10px' }}>

            <div style={{ width: '100%', height: '400px' }}>
              <Line data={this.state.data2} options={this.options2} />
            </div>
          </div>

        </div>
      </main>
    );
  }
}
