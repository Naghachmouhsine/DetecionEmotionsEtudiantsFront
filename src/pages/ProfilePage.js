
import React from "react";

import SideBare from "../componant/SideBare";
import Header from "../componant/Header";
import UserProfile from "../componant/Profile";
import '../componant/sidebare.css'
export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            data : [],
            openSidebarToggle : false
        };
        console.log(this.state.user);
    }
    // async componentDidMount(){
    //     const data=await DashboardService.getStatisitque(this.state.user.id)
    //     this.setState({data : data})
    // }
    OpenSidebar = () => {
        this.setState({openSidebarToggle : !this.state.openSidebarToggle})
      }
    render() {
        return (
        <div className='grid-container'>
            <Header OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <SideBare openSidebarToggle={this.state.openSidebarToggle} OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <UserProfile userInfo={this.state.user} />
        </div>
        );
    }
}
