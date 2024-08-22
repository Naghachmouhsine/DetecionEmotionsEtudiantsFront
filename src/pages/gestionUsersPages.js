
import React from "react";
import SideBare from "../componant/SideBare";
import Header from "../componant/Header";
import '../componant/sidebare.css'
import GestionUsers from "../componant/gestionUserCompenant";
export default class GestionUsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            data : [],
            openSidebarToggle : false
        };
    }

    OpenSidebar = () => {
        this.setState({openSidebarToggle : !this.state.openSidebarToggle})
      }
    render() {
        return (
        <div className='grid-container'>
            <Header OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <SideBare openSidebarToggle={this.state.openSidebarToggle} OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <div className="main-container">
                 <GestionUsers />
            </div>
        </div>
        );
    }
}
