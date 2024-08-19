import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCompenant from '../componant/LoginCompenant';
import AuthService from '../services/authService';
import Swal from 'sweetalert2';
import { Navigate, redirect } from 'react-router';
import FaceDetectionService from '../services/FaceDetectionService';
export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      formData : {
        "email" : "",
        "password" : ""
      },
      authReussi : true,
      redirect : null
    }
  }
  submitForm=async (e)=>{
    e.preventDefault()
    try {
      const response=await AuthService.auth(this.state.formData,"login") 
      if(!response.data.resultat)
        this.setState({authReussi : false})
      else{
        localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("isAuth",true)
        console.log(response.data)
        this.setState({redirect : "/dashboard"})
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'erreur!',
        text: 'probleme de connexion,essayer plus tart',
        confirmButtonText: 'OK'
    })
    }
  }
  changeDataForm=(e)=>{
    const {name,value}=e.target
    this.setState(
      prevState=>(
        {
          formData : {
            ...prevState.formData,
            [name] : value
          }
        }
      )
    )
  }
  render() {
    if(this.state.redirect)
      return <Navigate to={this.state.redirect}></Navigate>
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card shadow-sm" style={{ width: '800px' }}>
          <div className="row no-gutters">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-primary text-white">
              {/* Logo Section */}
              <LoginCompenant url="/register" type="Sign Up" />
            </div>
            <div className="col-md-6 p-4" style={{backgroundColor : "#fff"}}>
              {/* Form Section */}
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={this.submitForm}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    autoFocus
                    autoComplete="username"
                    value={this.state.formData.email}
                    onChange={this.changeDataForm}
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
                    onChange={this.changeDataForm}

                  />
                </div>
                {!this.state.authReussi && <p style={{color : "red"}}>email ou motPass incorrect</p>}
                <button type="submit" className="btn btn-primary w-100">
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
