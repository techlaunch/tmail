import React, { Component } from "react";
import socket from '../../socket';

class WaitingEmailConfirmationScreen extends Component {
  componentDidMount() {
    socket.on('User Email Verified', (data) => {
      this.props.history.replace('/reset-password', data);
    });
  }

  render() {
    return (
      <div className="screen">
        <h3 className="text-white">An email has been sent to {this.props.location.state.email}</h3>
      </div>
    );
  }
}

export default WaitingEmailConfirmationScreen;