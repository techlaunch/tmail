// Show or hide the loading screen
const onLoadingChange = (state, action) => {
  return {
    ...state,
    loading: action.loading,
  }
}

// Show or hide the activity indicator
const onNetworkActivity = (state, action) => {
  return {
    ...state,
    networkActivity: action.networkActivity,
  }
}

const indicators = (
  state = {
    loading: true,
    networkActivity: false
  },
  action) => {
  switch (action.type) {
    case 'ON_LOADING_CHANGE':
      return onLoadingChange(state, action);
    case 'ON_NETWORK_ACTIVITY_CHANGE':
      return onNetworkActivity(state, action);
    default:
      return state;
  }
};

export default indicators;