import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default class SideBare extends React.Component {
    constructor(props){
        super(props);
        this.state={
            expanded : true
        }
    }
    render() {
        const sideNavStyle = {
            backgroundColor: '#0fa2eb',
        };

        const navItemStyle = {
            color: '#fff',
        };

        const navIconStyle = {
            color: '#fff',
        };
        return (
            <SideNav
                expanded={this.state.expanded}
                style={sideNavStyle}
                onToggle={()=>this.setState({expanded : !this.state.expanded})}
            >
                <SideNav.Toggle onClick={()=>this.setState({expanded : !this.state.expanded})} />
                <SideNav.Nav defaultSelected="Dashboard">
                    <NavItem eventKey="Dashboard" style={navItemStyle}>
                        <NavIcon style={navIconStyle}>
                            <i className="fas fa-tachometer-alt me-2" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Dashboard
                            </NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Emotions Detections" style={navItemStyle}>
                        <NavIcon style={navIconStyle}>
                            <i className="fas fa-smile me-2" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            <NavLink  to="/emotionDetection" style={{ color: 'inherit', textDecoration: 'none' }}> 
                                Emotions Detections
                            </NavLink>
                        </NavText>    
                        
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        );
    }
}
