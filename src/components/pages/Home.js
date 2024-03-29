import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class Home extends Component {
    state = { authenticated: null };

  checkAuthentication = async() =>  {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async() => {
    this.props.auth.login('/');
  }

  logout = async() => {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;

    const mainContent = this.state.authenticated ? (
        <div>
            <p className="lead">You Have Entered The Staff Portal, <Link to="/staff">Click here</Link></p>
            <button className="btn btn-light btn-lg" onClick={this.logout}>Logout</button>
        </div>
    ) : (
      <div>
          <p className="lead">if you are a staff member please get your credientials from your supervisor</p>
          <button className="btn btn-light btn-lg" onClick={this.login}>Login</button>
      </div>
    );
    return (
      <div className="jumbotron">
        <h1 className="display-4">Acme Staff Portal</h1>
        {mainContent}
      </div>
    );
  }
});