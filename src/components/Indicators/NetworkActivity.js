import React from 'react';

const NetworkActivity = (props) => props.show ? (
  <div className="network-activity-indicator">
    <div></div>
    <div></div>
    <div></div>
  </div>
) : null;

export default NetworkActivity;