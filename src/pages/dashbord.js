
import React from "react";
// import "../assets/sb-admin-2.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SideBare from "../componant/SideBare";
import BarChart from "../componant/BarChart";
import DashboardService from "../services/dashboardDataService";
import Header from "../componant/Header";
import DashboardContent from "../componant/DashboardContent";
import '../componant/sidebare.css'
export default class Dashboard extends React.Component {
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
            <DashboardContent user={this.state.user} />
        </div>
        );
    }
}
