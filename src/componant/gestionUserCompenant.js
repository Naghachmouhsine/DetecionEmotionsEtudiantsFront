import React from 'react';
import { BsPencilSquare, BsTrash, BsPlus } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.css'; // Assurez-vous d'avoir vos styles personnalisés ici
import { Modal, Button } from 'react-bootstrap';
import RegisterModal from './registerModal';
import AuthService from '../services/authService';
import Swal from "sweetalert2";

export default class GestionUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showModalAjouterUser : false,
      userSelected : {},
      showModalSupprimeUser : false
    };
    this.rolesLabel={
      1 : "enseigenant",
      2 : "administrateur",
      3 : "super administrateur"
    }
  }

  getAllUsers=async ()=>{
        const allUsers=await AuthService.getAllUsers()
    console.log(allUsers)

        return allUsers
  }

  async componentDidMount(){
    const allUsers=await this.getAllUsers()
    console.log(allUsers)
    this.setState({users: allUsers})
  }
  handleAddUser = () => {
    // Logique pour ajouter un nouvel utilisateur
    console.log('Ajout d\'un nouvel utilisateur');
  };

  handleEditUser = (user) => {
    // Logique pour éditer l'utilisateur
    this.setState({userSelected : user,showModalAjouterUser : true})
  };

   fermerModal=async ()=>{
    const allUsers=await this.getAllUsers()
    this.setState({showModalAjouterUser : false,users : allUsers,userSelected : {},showModalSupprimeUser : false})
    console.log(this.state)
  }
  confirmerSuppression=async ()=>{
    console.log(this.state.userSelected)
    const response=await AuthService.auth(this.state.userSelected,"deleteProfile")
    if(response.data.succes){
      const allUsers=await this.getAllUsers()
      this.setState({users : allUsers,showModalSupprimeUser : false})
    }else{
      Swal.fire({
        icon: 'error',
        title: 'erreur!',
        text: 'Erreur lors de suppression',
        confirmButtonText: 'OK'
    })
    }
  }
  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Gestion des Utilisateurs</h2>
        <div className="text-start mb-3">
          <button 
            className="btn btn-success" 
            onClick={()=>this.setState({showModalAjouterUser : true})}
          >
            <BsPlus /> Ajouter Utilisateur
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col" className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{this.rolesLabel[user.role]}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => this.handleEditUser(user)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={()=>this.setState({showModalSupprimeUser : true,userSelected : user})}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={this.state.showModalAjouterUser} onHide={this.fermerModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3 className="text-center mb-4">{Object.keys(this.state.userSelected).length!=0 ? 'Modifier Profile' : 'Ajouter Profile'}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterModal  isModal={true} user={this.state.userSelected} />
                </Modal.Body>
        </Modal>
        <Modal show={this.state.showModalSupprimeUser} onHide={this.fermerModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className="text-center mb-4">Confirmation Suppression</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center">Êtes-vous sûr de vouloir supprimer {this.state.userSelected.nom}  {this.state.userSelected.prenom} ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.fermerModal}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={this.confirmerSuppression}>
                    Supprimer
                </Button>
            </Modal.Footer>
</Modal>

      </div>
    );
  }
}
