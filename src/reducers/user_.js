const onUpdateUser = (state, action) => action.user;

const user = (state = null, action) => {
  switch (action.type) {
    case 'ON_UPDATE_USER':
      return onUpdateUser(state, action);
    default:
      return state;
  }
};

export default user;
