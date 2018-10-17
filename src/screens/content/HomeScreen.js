import React, { Component } from "react";
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import SideNav from '../../components/SideNav';
import { FloatingButton } from '../../components/buttons';
import { MdModeEdit } from 'react-icons/md';
import { MdSend } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { EmailList, EmailView } from '../../components/Emails';
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

  onSendEmail = async () => {
    const success = await this.props.onSendEmail(this.props.email.form);

    if (success) {
      this.props.history.replace('/home/emails');
    }
  }

  onReadEmail = (email) => {
    this.props.history.push('/home/email/' + email._id)
  }

  componentDidMount() {
    this.props.onFetchingEmails();
  }

  render () {
    const { match, email, onEmailFormChange, user } = this.props;

    return (
      <div style={{
        minWidth: '350px'
      }}>
        <NavBar unread={email.list.reduce((acc, email) => !email.read && email.receiver.email === user.email ? ++acc : acc, 0)}/>
        <SideNav 
          open={this.state.open} 
          onDrawerOpen={this.onDrawerOpen}
          onDrawerClose={this.onDrawerClose}
        >
          {
            (() => {
              switch (match.params.screen) {
                case 'emails':
                  return <EmailList onReadEmail={this.onReadEmail} user={user} emails={email.list}/>
                case 'new-email':
                  return <EmailForm onEmailFormChange={onEmailFormChange} form={this.props.email.form}/>
                case 'email':
                  return <EmailView user={user} emails={email.list} emailid={match.params.emailid} onEmailFormChange={onEmailFormChange}/>
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
                        justifyContent: 'center',
                        position: 'absolute'
                      }}>
                        <MdModeEdit size={20} />
                      </Link>
                    </FloatingButton>
                  )
                case 'new-email':
                  return (
                    <div>
                      <FloatingButton position='bottom-left' onClick={()=> onEmailFormChange(null)}>
                        <Link to="/home/emails" style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: '50%',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'absolute'
                        }}>
                          <MdDelete size={20} />
                        </Link>
                      </FloatingButton>

                      <FloatingButton onClick={this.onSendEmail}>
                        <MdSend size={20} />
                      </FloatingButton>
                    </div>
                    
                  )
                default:
                  return null
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