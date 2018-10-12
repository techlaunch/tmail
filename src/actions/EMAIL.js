import { server } from '../api';
import { alert } from '../components/Alerts';
import validate from '../methods/validate';

const EMAILS = (dispatch) => ({
  onFetchingEmails: () => {
    dispatch({
      type: 'ON_LOADING_EMAILS',
      loading: true
    });

    return fetch(server + '/emails', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          dispatch({
            type: 'ON_FETCHING_EMAILS',
            emails: response.emails
          });
        }
        else {
          alert.show()(response.message, 'info');
        }

        dispatch({
          type: 'ON_LOADING_EMAILS',
          loading: false
        });
      })
      .catch(err => {
        dispatch({
          type: 'ON_LOADING_EMAILS',
          loading: false
        });
        alert.show()(err.message, 'error');
      });
  },

  onEmailFormChange: (email) => dispatch({
    type: 'ON_EMAIL_FORM_CHANGE',
    email: email
  }),

  onSendEmail: (email) => {
    if (!validate.email(email.to)) {
      return alert.show()('Invalid email. Please enter a valid destination email', 'info');
    }

    if (!email.message) {
      return alert.show()('No message entered. Please write a message before sending the email', 'info');
    }

    return fetch(server + '/send-email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(email)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          dispatch({
            type: 'ON_ADD_EMAIL',
            user: response.email
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
  
});

export default EMAILS;