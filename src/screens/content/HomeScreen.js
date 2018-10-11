import React, { Component } from "react";
import NavBar from '../../components/NavBar';
import SideNav from '../../components/SideNav';

class HomeScreen extends Component {
  state = {
    open: false,
  }

  onDrawerOpen = () => {
    this.setState({ open: true });
  };

  onDrawerClose = () => {
    this.setState({ open: false });
  };

  render () {
    return (
      <div>
        <NavBar />
        <SideNav 
          open={this.state.open} 
          onDrawerOpen={this.onDrawerOpen}
          onDrawerClose={this.onDrawerClose}
        />
      </div>
    );
  }
}

export default HomeScreen;