import { server } from '../api';
import { alert } from '../components/Alerts';
import validate from '../methods/validate';
import socket from '../socket';

const USER = (dispatch) => ({
  checkUserSession: () => {
    return fetch(server + '/user-session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ socket_id: socket.id }),
    })
      .then(response => response.json())
      .then(response => {

        if (response.user) {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: response.user
          });
        }
        else {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: null
          });
        }

        setTimeout(() => {
          dispatch({
            type: 'ON_LOADING_CHANGE',
            loading: false
          });
        }, 3000);
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }

        setTimeout(() => {
          dispatch({
            type: 'ON_LOADING_CHANGE',
            loading: false
          });
        }, 3000);
      });
  },

  onSignIn: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert.show()('Invalid email. Please enter a valid email', 'info');
    }

    if (!validate.password(credentials.password)) {
      return alert.show()('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters', 'info');
    }

    return fetch(server + '/user-sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch({
          type: 'ON_UPDATE_USER',
          user: response.user
        })
      }
      else {
        alert.show()(response.message, 'info');
      }
    })
    .catch(err => {
      alert.show()(err.message, 'error');
    })
  },

  onSignUp: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert.show()('Invalid email. Please enter a valid email', 'info')
    }

    if (!validate.password(credentials.password)) {
      return alert.show()('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters', 'info')
    }

    if (!credentials.name) {
      return alert.show()('Invalid name. Please enter a name', 'info')
    }

    if (!credentials.birthday) {
      return alert.show()('Invalid age. Please enter a valid age', 'info')
    }

    return fetch(server + '/user-sign-up', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert.show()(response.message, 'info');
          return false;
        }
      })
      .catch(err => {
        alert.show()(err.message, 'error');
      })
  },

  onForgotPassword: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert.show()('Invalid email. Please enter a valid email', 'info')
    }

    return fetch(server + '/user-password-recovery', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert.show()(response.message, 'info');
          return false;
        }
      })
      .catch(err => {
        alert.show()(err.message, 'error');
      })
  },

  onResetPassword: (credentials, token) => {
    if (!validate.password(credentials.newPassword)) {
      return alert.show()('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters', 'info');
    }

    if (credentials.newPassword !== credentials.newPasswordConfirmation) {
      return alert.show()('Passwords do not match. Please make sure to type the same password', 'info');
    }

    return fetch(server + '/user-change-password/' + token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert.show()(response.message, 'info');
          return false;
        }
      })
      .catch(err => {
        alert.show()(err.message, 'error');
      })
  },

  onUserLogOut: () => {
    return fetch(server + '/user-sign-out', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        socket_id: socket.id
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: null
          });
        }
        else {
          alert.show()(response.message, 'info');
        }
      })
      .catch(err => {
        alert.show()(err.message, 'error');
      });
  },

});

export default USER;