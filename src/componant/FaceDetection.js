import React, { Component } from 'react';
import './styles.css';
import Swal from 'sweetalert2';
import FaceDetectionService from '../services/FaceDetectionService';
import { Modal,Spinner,Button,Form } from 'react-bootstrap';
export default class FaceDetection extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.stream=null
    this.state = {
      isRunning: false,
      classCounts: {},
      isConneced : false,
      frame : "",
      showModal : false,
      showModalConf : false,
      selectedModule : ""
    };
    this.intervalId = null;
    this.userCurrent =JSON.parse(localStorage.getItem("user"))
  }

  componentDidMount(){ //test la connextion lors rechargement component
    this.checkConexion()
  }

  checkConexion=async ()=>{
    const isConneced=await FaceDetectionService.tstCnx()
    this.setState({isConneced : isConneced})
  }
  startCamera = async () => {
  console.log(this.state.isConneced)
  if (this.state.isConneced) {
    try {
      // this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoRef.current;
      video.src =process.env.PUBLIC_URL + '/tstVedio.mp4';
      video.srcObject=this.stream
      video.play();
      this.setState({ isRunning: true });
      this.intervalId = setInterval(this.detectFaces, 1000 / 30);
    } catch (err) {
      console.error('Error accessing the camera: ', err);
    } 
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Connexion au serveur échouée,réessayer plus tard',
    });
  }
  }

  confirmationAnnullationSauvgard=(isConfirm)=>{
    this.setState({showModalConf : false})
    if(isConfirm){
      this.stopCamera({"module" : this.state.selectedModule,"dataSeance" : new Date().toISOString().slice(0, 19).replace('T', ' '),"user_id" : this.userCurrent.id})
    }
  }
  stopCamera =async  (seance) => {
    clearInterval(this.intervalId)
    const video = this.videoRef.current;
    // this.stream.getTracks().forEach(track => track.stop());
    // this.videoRef.srcObject = null;
    
  // Arrêter le flux vidéo
  if (this.stream) {
    this.stream.getTracks().forEach(track => track.stop());
    this.stream = null;
  }

  // Réinitialiser la source de la vidéo et arrêter la lecture
    video.pause();
    // video.srcObject = null;
    video.src = "";
    
    
    this.setState({ isRunning: false,classCounts : {},frame : "" });
    this.setState({showModal : true})
    try {
      console.log(seance)
      const res=await FaceDetectionService.insertNewSeance(seance)
      Swal.fire({
        icon : "success",
        title : "success",
        text : "Sauvgarde fait avec success"
      })
      console.log(res.json())

    } catch (error) {
      Swal.fire(
        {
          icon : "error",
          title : "error",
          text : "erreur de sauvgarde"
        }
      )
    }
    this.setState({showModal : false})
  }

  
  detectFaces = async () => {
      // console.log("arrete")
      // console.log(this.state.isRunning)
    try {
      // console.log("inter",this.intervalId)
      const canvas =this.canvasRef.current;
      const context = canvas.getContext('2d');
      const video = this.videoRef.current;
      canvas.width = 640;
      canvas.height = 480;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      const response = await FaceDetectionService.detectFaces(dataURL,this.userCurrent.id)
      const data = await response.json();
      this.updateInfoContainer(data);
      this.setState({ frame: 'data:image/jpeg;base64,' + data.frame });
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  }
  updateInfoContainer = (data) => {
    const faceCount = data.class_names.length;
    const classCounts = {};

    data.class_names.forEach(class_name => {
      classCounts[class_name] = (classCounts[class_name] || 0) + 1;
    });

    for (let class_name in classCounts) {
      classCounts[class_name] = (classCounts[class_name] / faceCount) * 100;
    }

    this.setState({ classCounts  : classCounts});
  }

  render() {
    return (
      <div className="container">
        <div id="camera">
          <video ref={this.videoRef} width="640" height="480" autoPlay style={{ display: 'none' }}></video>
          <canvas ref={this.canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
          <img id="processed-image" src={this.state.frame} width="640" height="480" alt="" />
        </div>
        <div className="info-container" id="info">
          {Object.entries(this.state.classCounts).map(([class_name, percentage]) => (
            <div key={class_name}>Pourcentage des étudiants qui sont {class_name} est {percentage.toFixed(2)}%</div>
          ))}
        </div>
        <div className="button-container">
          <button
            onClick={this.state.isRunning ? ()=>this.setState({showModalConf : true}): this.startCamera}
            className="control-button"
            style={{ backgroundColor: this.state.isRunning ? 'red' : '#4CAF50' }}
          >
            {this.state.isRunning ? 'Arrêter' : 'Lancer'}
          </button>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.setState({showModal :  false})} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Chargement...</span>
          </Spinner>
          <p>Veuillez patienter pendant que nous traitons votre demande...</p>
        </Modal.Body>
      </Modal>
      <Modal show={this.state.showModalConf} onHide={() => this.setState({ showModalConf: false })} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirmation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formModuleSelect">
        <Form.Label>Nom du Module</Form.Label>
        <Form.Control as="select" value={this.state.selectedModule} onChange={(e) => this.setState({ selectedModule: e.target.value })}>
          <option value="">Sélectionner un module</option>
          <option value="module1">Module 1</option>
          <option value="module2">Module 2</option>
          <option value="module3">Module 3</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => this.confirmationAnnullationSauvgard(false)}>
      Annuler
    </Button>
    <Button variant="primary" onClick={() => this.confirmationAnnullationSauvgard(true)}>
      Confirmer
    </Button>
  </Modal.Footer>
</Modal>

      </div>
    );
  }
}
