import React from "react";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/authService";
import Swal from "sweetalert2";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                nom : this.props.userInfo.nom,
                prenom : this.props.userInfo.prenom,
                email : this.props.userInfo.email,
                role : this.props.userInfo.role
            },
            editing: false,
            originalData: {}
        };
    }

    toggleEdit = () => {
        this.setState((prevState) => ({
            editing: !prevState.editing,
            originalData: prevState.formData
        }));
        console.log(this.state.formData)

    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
        console.log(this.state.formData)
    }
    handleSave = async () => {
        try {
            const response = await AuthService.auth(this.state.formData,"updateProfile");
            console.log(response.data)
            if (response.data.succes) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Profil mis à jour avec succès.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.setState({ editing: false });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur!',
                    text: 'Une erreur s\'est produite lors de la mise à jour du profil.',
                    confirmButtonText: 'OK'
                });
            }
        console.log(this.state.formData)

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur s\'est produite lors de la mise à jour du profil.',
                confirmButtonText: 'OK'
            });
        }
    }

    handleCancel = () => {
        this.setState(prevState => ({
            formData: prevState.originalData,
            editing: false
        }));
        console.log(this.state.formData)
        
    }

    render() {
        const { nom, prenom, email, role } = this.state.formData;
        const { editing } = this.state;

        return (
        <div className="main-container">
            <div className="user-profile">
                <h3 className="text-center mb-4 " style={{color : "#000"}}>Profile</h3>
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="nom">Nom</label>
                        <input
                            id="nom"
                            type="text"
                            name="nom"
                            className="form-control"
                            value={nom}
                            onChange={this.handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="prenom">Prenom</label>
                        <input
                            id="prenom"
                            type="text"
                            name="prenom"
                            className="form-control"
                            value={prenom}
                            onChange={this.handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            value={email}
                            disabled
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="form-select"
                            value={role}
                            onChange={this.handleInputChange}
                            disabled={!editing}
                        >
                            <option value="2">Administrateur</option>
                            <option value="1">Enseignant</option>
                        </select>
                    </div>
                </form>
                <div className="user-profile__actions" style={{display : "flex" , justifyContent : "space-around" }}>
                    <button className="btn btn-primary" onClick={this.toggleEdit}>
                        {editing ? 'Cancel' : 'Edit'}
                    </button>
                    {editing && (
                        <button className="btn btn-success ml-2" onClick={this.handleSave}>
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
        );
    }
}
