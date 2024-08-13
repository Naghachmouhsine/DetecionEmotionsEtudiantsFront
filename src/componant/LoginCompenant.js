import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class LoginCompenant extends React.Component {
  render() {
    return (
      <div className="text-center p-4">
        <img
          src={process.env.PUBLIC_URL + "/file.enc"}
          alt="Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: '150px' }}
        />
        <h2>Welcome</h2>
        <Link to={this.props.url} className="btn btn-light mt-3">
          {this.props.type}
        </Link>
      </div>
    );
  }
}
