import React from 'react';
import { BsPersonFill, BsPencilSquare, BsTrash, BsPlus } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.css'; // Assurez-vous d'avoir vos styles personnalisés ici
import { Modal, ModalBody } from 'react-bootstrap';
import RegisterModal from './registerModal';
import AuthService from '../services/authService';
export default class GestionUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showModalAjouterUser : false
    };
  }

  getAllUsers=async ()=>{
        const allUsers=await AuthService.getAllUsers()
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

  handleEditUser = (userId) => {
    // Logique pour éditer l'utilisateur
    console.log(`Édition de l'utilisateur avec l'ID: ${userId}`);
  };

  handleDeleteUser = (userId) => {
    // Logique pour supprimer l'utilisateur
    this.setState({
      users: this.state.users.filter(user => user.id !== userId)
    });
  };

   fermerModal=async ()=>{
    const allUsers=await this.getAllUsers()
    this.setState({showModalAjouterUser : false,users : allUsers})
    console.log(this.state)
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
                <td>{user.role}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => this.handleEditUser(user.id)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => this.handleDeleteUser(user.id)}
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
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterModal  isModal={true} />
                </Modal.Body>
        </Modal>
      </div>
    );
  }
}
