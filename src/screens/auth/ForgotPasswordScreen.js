import React, { Component } from "react";
import { connect } from 'react-redux';
import { USER } from '../../actions';
import { OutlinedInput } from '../../components/inputs';
import { OutlinedButton } from '../../components/buttons';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Logo from '../../images/logo.svg';
import socket from '../../socket';

class ForgotPasswordScreen extends Component {
  state = {
    socket_id: socket.id,
    email: ''
  }

  onChange = (email, password) => {
    this.setState({
      email: email,
      password: password
    });
  }

  onForgotPassword = async () => {
    const success = await this.props.onForgotPassword(this.state);

    if (success) {
      this.props.history.replace('/awaiting-email-verification', {
        email: this.state.email
      });
    }
  }

  render() {
    return (
      <div className="screen">
        <Paper className="form-container" elevation={1}>
          <div className="logo-container">
            <img src={Logo} height="200" width="200" alt="logo" />
          </div>

          <div>
            <OutlinedInput
              id="email"
              type="text"
              label="Email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(e) => this.onChange(e.target.value, this.state.password)}
            />
          </div>

          <OutlinedButton
            onClick={this.onForgotPassword}
            text="Verify Email"
          />

          <div className="links-container">
            <Link to="/sign-in">Sign in</Link>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return USER(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);