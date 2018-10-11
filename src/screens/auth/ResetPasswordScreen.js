import React, { Component } from "react";
import { connect } from 'react-redux';
import { USER } from '../../actions';
import { OutlinedInput } from '../../components/inputs';
import { OutlinedButton } from '../../components/buttons';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Logo from '../../images/logo.svg';

class ResetPasswordScreen extends Component {
  state = {
    newPassword: '',
    newPasswordConfirmation: ''
  }

  onChange = (newPassword, newPasswordConfirmation) => {
    this.setState({
      newPassword: newPassword,
      newPasswordConfirmation: newPasswordConfirmation
    });
  }

  onResetPassword = async () => {
    const success = await this.props.onResetPassword(this.state, this.props.location.state.token);

    if (success) {
      this.props.history.replace('/sign-in');
    }
    
  }

  render() {
    // console.log('token ', this.props.location.state.token);
    return (
      <div className="screen">
        <Paper className="form-container" elevation={1}>
          <div className="logo-container">
            <img src={Logo} height="200" width="200" alt="logo" />
          </div>

          <div>
            <OutlinedInput
              id="password"
              type="password"
              label="New Password"
              placeholder="Enter New Password"
              value={this.state.newPassword}
              onChange={(e) => this.onChange(e.target.value, this.state.newPasswordConfirmation )}
            />

            <OutlinedInput
              id="password-confirmation"
              type="password"
              label="New Password Confirmation"
              placeholder="Enter New Password Confirmation"
              value={this.state.newPasswordConfirmation}
              onChange={(e) => this.onChange(this.state.newPassword, e.target.value)}
            />
          </div>

          <OutlinedButton
            onClick={this.onResetPassword}
            text="Reset Password"
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);