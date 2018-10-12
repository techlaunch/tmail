import React, { Component } from "react";
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import SideNav from '../../components/SideNav';
import { FloatingButton } from '../../components/buttons';
import { MdModeEdit } from 'react-icons/md';
import { MdSend } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { EmailList } from '../../components/Emails';
import { EmailForm } from '../../components/Forms';
import { Redirect, Link } from "react-router-dom"; 
import { EMAIL } from '../../actions';

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
    const { match } = this.props;

    return (
      <div style={{
        minWidth: '400px'
      }}>
        <NavBar />
        <SideNav 
          open={this.state.open} 
          onDrawerOpen={this.onDrawerOpen}
          onDrawerClose={this.onDrawerClose}
        >
          {
            (() => {
              switch (match.params.screen) {
                case 'emails':
                  return <EmailList />
                case 'new-email':
                  return <EmailForm form={this.props.email.form}/>
                default:
                  return <Redirect to="/home/emails" />
              }
            })()
          }
          
          {
            (() => {
              switch (match.params.screen) {
                case 'emails':
                  return (
                    <FloatingButton>
                      <Link to="/home/new-email" style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '50%',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <MdModeEdit size={20} />
                      </Link>
                    </FloatingButton>
                  )
                case 'new-email':
                  return (
                    <div>
                      <FloatingButton position='bottom-left'>
                        <Link to="/home/emails" style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: '50%',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <MdDelete size={20} />
                        </Link>
                      </FloatingButton>

                      <FloatingButton>
                        <MdSend size={20} />
                      </FloatingButton>
                    </div>
                    
                  )
                default:
                  return <Redirect to="/home/emails" />
              }
            })()
          }
     
        </SideNav>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    email: state.email
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return EMAIL(dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);