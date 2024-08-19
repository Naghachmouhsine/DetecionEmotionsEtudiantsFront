import React from "react";
import SideBare from "../componant/SideBare";
import Header from "../componant/Header";
import FaceDetection from "../componant/FaceDetection";
export default class FaceDetectionPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            data : [],
            openSidebarToggle : false
        };
        console.log(this.state.user);
    }
    render(){
        return(
            <div className='grid-container'>
            <Header OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <SideBare openSidebarToggle={this.state.openSidebarToggle} OpenSidebar={this.OpenSidebar} user={this.state.user}/>
            <FaceDetection />
        </div>
        );
    }
}