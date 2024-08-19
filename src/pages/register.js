import React from "react";
import '../assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCompenant from "../componant/LoginCompenant";
import AuthService from "../services/authService";
import { Navigate } from "react-router";
import Swal from "sweetalert2";
import RegisterModal from "../componant/registerModal";
export default class Register extends React.Component {
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
        if(this.state.redirect)
          return  <Navigate to={this.state.redirect}></Navigate>
        return (
            
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card shadow-sm" style={{ width: '800px' }}>
          <div className="row no-gutters">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-primary text-white">
              {/* Logo Section */}
              <LoginCompenant url="/login" type="Sign Up" />
            </div>
                <RegisterModal isModal={false} />
                </div>
            </div>
            </div>
        );
    }
}
