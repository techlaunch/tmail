import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Loading } from './components/Indicators';
import { 
  HomeScreen, 
  SignInScreen, 
  SignUpScreen, 
  ForgotPasswordScreen, 
  ResetPasswordScreen, 
  WaitingEmailConfirmationScreen,
  WaitingEmailVerificationScreen 
} from './screens';

const Routes = (props) => {
  const { user } = props;

  return props.indicators.loading ? <Loading /> : (
    <Router>
      <div>
        <Switch>
          <Route exact path="/sign-in" render={(props) => !user ? <SignInScreen {...props}/> : <Redirect to="/home" />} />
          <Route exact path="/sign-up" render={(props) => !user ? <SignUpScreen {...props} /> : <Redirect to="/home" />} />
          <Route exact path="/forgot-password" render={(props) => !user ? <ForgotPasswordScreen {...props} /> : <Redirect to="/home" />} />
          <Route exact path="/reset-password" render={(props) => !user ? <ResetPasswordScreen {...props} /> : <Redirect to="/home" />} />
          <Route exact path="/awaiting-email-confirmation" render={(props) => !user ? <WaitingEmailConfirmationScreen {...props} /> : <Redirect to="/home" />} />
          <Route exact path="/awaiting-email-verification" render={(props) => !user ? <WaitingEmailVerificationScreen {...props} /> : <Redirect to="/home" />} />


          <Route exact path="/home" render={(props) => user ? <HomeScreen {...props} /> : <Redirect to="/sign-in" />} />
          
          <Route path="/" render={(props) => user ? <Redirect to="/home" /> : <Redirect to="/sign-in" /> }/>
        </Switch>
      </div>
    </Router>
)};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    indicators: state.indicators
  }
}

export default connect(mapStateToProps)(Routes);