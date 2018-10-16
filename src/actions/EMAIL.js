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

  onEmailFormChange: (form) => dispatch({
    type: 'ON_EMAIL_FORM_CHANGE',
    form: form
  }),

  onSendEmail: (form) => {
    if (!validate.email(form.receiver.email)) {
      return alert.show()('Invalid email. Please enter a valid destination email', 'info');
    }

    if (!form.message) {
      return alert.show()('No message entered. Please write a message before sending the email', 'info');
    }

    return fetch(server + '/send-email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          dispatch({
            type: 'ON_ADD_EMAIL',
            email: response.email
          })
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
  
});

export default EMAILS;