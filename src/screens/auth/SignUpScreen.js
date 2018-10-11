import React, { Component } from "react";
import { connect } from 'react-redux';
import { USER } from '../../actions';
import { OutlinedInput, OutlinedSelect, DateSelector } from '../../components/inputs';
import { OutlinedButton } from '../../components/buttons';
import { Link } from "react-router-dom";
import ImageUploader from '../../components/ImageUploader';
import Paper from '@material-ui/core/Paper';
import Logo from '../../images/logo.svg';
import moment from 'moment';
import socket from '../../socket';

class SignUpScreen extends Component {
  state = {
    file: '',
    imageURL: '',
    socket_id: socket.id,
    email: '',
    password: '',
    name: '',
    birthday: moment().subtract(13, 'years'),
    gender: ''
  }

  onChange = ({email, password, name, birthday, gender}) => {
    this.setState({
      email: email,
      password: password,
      name: name,
      birthday: birthday,
      gender: gender
    });
  }

  saveCroppedImage = (file, imageURL, force) => {
    this.setState({
      file: (file || force) ? file : this.state.file,
      imageURL: (imageURL || force) ? imageURL : this.state.imageURL
    });
  }

  onSignUp = async () => {
    const success = await this.props.onSignUp(this.state);

    if(success) {
      this.props.history.replace('/awaiting-email-confirmation', {
        email: this.state.email
      });
    }
  }

  render() {
    return (
      <div className="screen">
        <Paper className="form-container" elevation={1}>
          <div className="logo-container">
            <ImageUploader
              image={Logo}

              saveCroppedImage={this.saveCroppedImage.bind(this)}
              file={this.state.file}
              imageURL={this.state.imageURL}
              label='PROFILE PICTURE'
              reference={this.state.email}
              fileName={'avatar'}
              hoverColor={'#00acac'}
              btnColor={'#000'}
            />
          </div>

          <div>
            <OutlinedInput
              id="email"
              type="text"
              label="Email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(e) => this.onChange({
                ...this.state, 
                email: e.target.value
              })}
            />

            <OutlinedInput
              id="password"
              type="password"
              label="Password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={(e) => this.onChange({
                ...this.state,
                password: e.target.value
              })}
            />

            <OutlinedInput
              id="name"
              type="text"
              label="Name"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={(e) => this.onChange({
                ...this.state,
                name: e.target.value
              })}
            />

            <DateSelector
              id="birthday"
              label="Birthday"
              placeholder="Enter Birthday"
              value={this.state.birthday}
              maxDate={moment().subtract(13, 'years')}
              onChange={(date) => this.onChange({
                ...this.state,
                birthday: date
              })}
            />

            <OutlinedSelect
              id="gender"
              type="text"
              label="Gender"
              placeholder="Enter Gender"
              value={this.state.gender}
              options={[
                {
                  label: 'Female',
                  value: 'female'
                },
                {
                  label: 'Male',
                  value: 'male'
                }
              ]}
              onChange={(e) => this.onChange({
                ...this.state,
                gender: e.target.value
              })}
            />
          </div>

          <OutlinedButton
            onClick={this.onSignUp}
            text="Sign Up"
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);