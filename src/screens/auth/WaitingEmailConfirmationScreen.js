import React, { Component } from "react";
import socket from '../../socket';
import { Link } from "react-router-dom";

class WaitingEmailConfirmationScreen extends Component {
  state = {
    confirmed: false,
    name: ''
  }

  componentDidMount() {
    socket.on('User Email Confirmed', name => {
      this.setState({
        confirmed: true,
        name: name
      })
    })
  }

  render() {
    return (
      <div className="screen" style={{
        backgroundColor: this.state.confirmed ? '#4caf50' : '#e91e63',
        transition: 'background-color 450ms'
      }}>
        {
          this.state.confirmed ? (
            <div style={{
              textAlign: 'center'
            }}>
              <h3 className="text-white">Hi {this.state.name}, your email has been confirm.</h3>
              <h3 className="text-white"><Link to="/sign-in" className="text-white">Go to sign in screen</Link></h3>
            </div>
            
          ) : (
            <h3 className="text-white">An email has been sent to {this.props.location.state.email}</h3>
          )
        }
        
      </div>
    );
  }
}

export default WaitingEmailConfirmationScreen;