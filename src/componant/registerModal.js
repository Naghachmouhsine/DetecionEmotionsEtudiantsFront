import React from "react";
import '../assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCompenant from "../componant/LoginCompenant";
import AuthService from "../services/authService";
import { Navigate } from "react-router";
import Swal from "sweetalert2";
export default class RegisterModal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            formData : {
                nom : "",
                prenom : "",
                email : "",
                password :"",
                password_confirmation :"",
                role : ""
            },
            criteria: {
                len: false,
                lowercase: false,
                uppercase: false,
                number: false,
                special: false,
              },
            displayUl : false,
            passwordIsConfirm : true,
            redirect : null,
            passwordIsValid : true,
            emailExist : false
        }

    }
    changeDataForme=(event)=>{
        const {name,value}=event.target
        this.setState(prevState=>(
            {
                formData : {
                    ...prevState.formData,
                    [name] : value
                }
            }
        ))
        console.log(this.state.formData)
    }
    validatePassword = (event) => {
        var password = event.target.value;
        const {name,value}=event.target
        this.setState(prevState=>(
            {
                formData : {
                    ...prevState.formData,
                    [name] : value
                },
                criteria : this.checkCriteria(password)
            }
        ))
        // this.setState({ formData : { password : password}, criteria : this.checkCriteria(password)});
      };
      checkCriteria = (password) => {
        return {
          len: password.length >= 8,
          lowercase: /[a-z]/.test(password),
          uppercase: /[A-Z]/.test(password),
          number: /[0-9]/.test(password),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
      };
      passwordConfirm=(e)=>{
        const {name,value}=e.target
        var passConf=e.target.value
        this.setState(prevState=>(
            {
                formData : {
                    ...prevState.formData,
                    [name] : value
                },
                passwordIsConfirm : this.state.formData.password==passConf
            }
        ))
        // this.setState({ formData : { password_confirmation : passConf,password : this.state.formData.password}, passwordIsConfirm : this.state.formData.password==passConf});
        // console.log(passConf,this.state.formData.password,this.state.passwordIsConfirm)
      };
      submitForm=async (e)=>{
        e.preventDefault()
        if(Object.values(this.state.criteria).every(value=>value==true)) //test est ce que tous les criteres motPass sont vérifié
        {
                try {
                    const response=await AuthService.auth(this.state.formData,"register")
                    console.log(response)
                    if(response.data.res==="emailExiste")
                    {
                        console.log(response)
                        Swal.fire({
                            icon: 'error',
                            title: 'erreur!',
                            text: 'Email deja utilser dans un autre compte',
                            confirmButtonText: 'OK'
                        })
                    }
                    else{
                        if(response.data.res){
                            Swal.fire({
                                icon: 'success',
                                title: 'Succès!',
                                text: 'L\'opération a été effectuée avec succès.',
                                confirmButtonText: 'OK'
                            }).then(
                                ()=>{
                                    this.setState({redirect : "/"})
                                }
                            );

                        }
                }
                } catch (error) {
                    
                }
        }else
            this.setState({passwordIsValid : false})
      }
    render() {
        return (
            <div className={this.props.isModal ? "p-4" : "col-md-6 p-4"} style={{backgroundColor : "#fff"}}>
              {/* Form Section */}
              <h3 className="text-center mb-4">Register</h3>

                        <form onSubmit={this.submitForm} style={{paddingTopc: "0",paddingBottom : "0"}}>
                        <   div className="form-group mb-3">
                                <label htmlFor="nom">nom</label>
                                <input
                                    id="nom"
                                    type="nom"
                                    name="nom"
                                    className="form-control"
                                    required
                                    autoFocus
                                    autoComplete="nom"
                                    value={this.state.formData.nom}
                                    onChange={this.changeDataForme}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="prenom">prenom</label>
                                <input
                                    id="prenom"
                                    type="prenom"
                                    name="prenom"
                                    className="form-control"
                                    required
                                    autoFocus
                                    autoComplete="prenom"
                                    value={this.state.formData.prenom}
                                    onChange={this.changeDataForme}

                                />
                            </div>
                            <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="form-control"
                                required
                                autoFocus
                                autoComplete="email"
                                value={this.state.formData.email}
                                onChange={this.changeDataForme}
                                
                            />
                            </div>
                            <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="form-control"
                                required
                                autoComplete="current-password"
                                value={this.state.formData.password}
                                onChange={this.validatePassword}
                                onFocus={()=>this.setState({displayUl : true})}
                                onBlur={()=>this.setState({displayUl : false})}                                
                            />
                            </div>
                            {!this.state.passwordIsValid && <p style={{color : "red"}}>password non valide </p>}
                            <div className="form-group mb-3">
                                <label htmlFor="passwordConf">confirm password</label>
                                <input 
                                    id="password_confirmation" 
                                    type="password" 
                                    className="form-control"
                                    name="password_confirmation" 
                                    required 
                                    autoComplete="new-password" 
                                    value={this.state.formData.password_confirmation}

                                    onChange={this.passwordConfirm}

                                />
                                {!this.state.passwordIsConfirm && <p style={{color : "red",visibility : this}}>password non conforme</p>}
                            </div>
    
                            <div className="form-group mb-3">
                                <select
                                    className="form-select"
                                    //  placeholder="select role" 
                                     id="role" 
                                     name="role"
                                     value={this.state.formData.role}
                                     onChange={this.changeDataForme}
                                    
                                     >
                                    <option value="" disabled >select role</option>
                                    <option value={2}>Adminstrateur</option>
                                    <option value={1}>Enseignant</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                sign up
                            </button>
                        </form>
                        <ul  style={{visibility : this.state.displayUl ? "visible" : "hidden"}} >
                            <li style={{ color: this.state.criteria.len ? 'green' : 'red' }}>
                                Longueur minimale de 8 caractères
                            </li>
                            <li style={{ color: this.state.criteria.lowercase ? 'green' : 'red' }}>
                                Contient des lettres minuscules
                            </li>
                            <li style={{ color: this.state.criteria.uppercase ? 'green' : 'red' }}>
                                Contient des lettres majuscules
                            </li>
                            <li style={{ color: this.state.criteria.number ? 'green' : 'red' }}>
                                Contient des chiffres
                            </li>
                            <li style={{ color: this.state.criteria.special ? 'green' : 'red' }}>
                                Contient des caractères spéciaux
                            </li>
                        </ul>
            </div>
        );
    }
}
