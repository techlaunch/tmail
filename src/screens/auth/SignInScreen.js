import React, { Component } from "react";
import { connect } from 'react-redux';
import { USER } from '../../actions';
import { OutlinedInput } from '../../components/inputs';
import { OutlinedButton } from '../../components/buttons';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Logo from '../../images/logo.svg';

class SignInScreen extends Component {
  state = { 
    email: '',
    password: ''
  }

  onChange = (email, password) => {
    this.setState({
      email: email,
      password: password
    });
  }

  onSignIn = () => {
    this.props.onSignIn(this.state);
  }

  render () {
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

            <OutlinedInput
              id="password"
              type="password"
              label="Password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={(e) => this.onChange(this.state.email, e.target.value)}
            />
          </div>
          
          <OutlinedButton 
            onClick={this.onSignIn}
            text="Login"
          />

          <div className="links-container">
            <Link to="/sign-up">Sign up</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);