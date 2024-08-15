
import React from "react";
import "../assets/sb-admin-2.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBare from "../componant/SideBare";
import BarChart from "../componant/BarChart";
import DashboardService from "../services/dashboardDataService";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            data : []
        };
        console.log(this.state.user);
    }
    async componentDidMount(){
        const data=await DashboardService.getStatisitque(this.state.user.id)
        this.setState({data : data})
    }
    render() {
        return (
            <div >
                <SideBare />
                <div style={{ width: '100%', padding: '20px' }} >
                <BarChart data={this.state.data} />
                </div>
            </div>
        );
    }
}
