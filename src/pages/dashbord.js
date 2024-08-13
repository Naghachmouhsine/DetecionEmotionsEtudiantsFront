import React from "react";
import "../assets/sb-admin-2.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBare from "../componant/SideBare";
export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user :JSON.parse( localStorage.getItem("user"))
        }
        console.log(this.state.user)
    }
    render(){
        return(
            <div style={{
                padding: '50px 0px 0px 370px'
            }}>
            <SideBare></SideBare>
            <div className="">
                {/* <div class="card"> */}
                        {/* <div class="card-body"> */}
                            <h5 class="card-title"> {this.state.user.nom}  {this.state.user.prenom} </h5>
                            {/* <p class="card-text"><strong>Email:</strong> {this.state.user.email} </p>
                            <p class="card-text"><strong>Statistiques:</strong></p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Sessions:</strong> 45</li>
                                <li class="list-group-item"><strong>Dernière Connexion:</strong> 12 août 2024</li>
                            </ul>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        ) 
    }
}
