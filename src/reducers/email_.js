import Email from '../classes/Email';

const onLoadingEmails = (state, action) => ({
  ...state,
  loading: action.loading
});

const onFetchingEmails = (state, action) => ({
  ...state, 
  list: action.emails
});

const onEmailFormChange = (state, action) => ({
  ...state,
  form: action.form || (new Email())
});

const onAddEmail = (state, action) => ({
  ...state,
  list: state.list.concat([action.email])
}) 

const emails = (
  state = {
    list: [],
    loading: false,
    form: new Email()
  },
  action) => {
  switch (action.type) {
    case 'ON_LOADING_EMAILS':
      return onLoadingEmails(state, action);
    case 'ON_FETCHING_EMAILS':
      return onFetchingEmails(state, action);
    case 'ON_EMAIL_FORM_CHANGE':
      return onEmailFormChange(state, action);
    case 'ON_ADD_EMAIL':
      return onAddEmail(state, action);
    default:
      return state;
  }
};

export default emails;