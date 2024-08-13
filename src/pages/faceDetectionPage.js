import React from "react";
import SideBare from "../componant/SideBare";
import FaceDetection from "../componant/FaceDetection";
export default class FaceDetectionPage extends React.Component{

    render(){
        return(
            <div style={{
                padding: '50px 0px 0px 370px'
            }}>
                <SideBare />
                <FaceDetection />
            </div>
        );
    }
}