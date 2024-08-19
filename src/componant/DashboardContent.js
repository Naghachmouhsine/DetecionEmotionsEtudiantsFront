import React, { Component } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import {ResponsiveContainer} from 'recharts';
import DashboardService from '../services/dashboardDataService';
import BarChartComponent from './BarChart';

export default class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          {/* <div className='card'>
            <div className='card-inner'>
              <h3>PRODUCTS</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>300</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>CATEGORIES</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>12</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>33</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>ALERTS</h3>
              <BsFillBellFill className='card_icon' />
            </div>
            <h1>42</h1>
          </div> */}
        </div>

        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChartComponent  />
          </ResponsiveContainer>
{/* 
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={this.state.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer> */}
        </div>
      </main>
    );
  }
}
