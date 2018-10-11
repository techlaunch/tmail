var showAlert = null;

module.exports = {
  set: (config)=>showAlert=config,
  show: ()=>showAlert
};
