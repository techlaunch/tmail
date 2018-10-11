import React, { Component } from 'react';
import AlertContainer from './react-alert/AlertContainer';
import alert from './alert';

class Alerts extends Component {
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 10000,
    transition: 'scale'
  }

  showAlert = (m,t) => {
    this.alert.show(m, {
      type: t
    });
  }

  componentDidMount(){
    alert.set(this.showAlert);
  }
  
  render() {
    return (
      <AlertContainer ref={a => this.alert = a} {...this.alertOptions} />
    )
  }
};

export default Alerts;

export { default as alert } from './alert';