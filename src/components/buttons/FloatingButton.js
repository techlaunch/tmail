import React from 'react';
import CircleButton from './CircleButton';

const styles = {
  bottomRight: {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  },
  bottomLeft: {
    position: 'absolute',
    bottom: '10px',
    left: '10px'
  }, 
  topRight: {
    position: 'absolute',
    top: '10px',
    right: '10px'
  },
  topLeft: {
    position: 'absolute',
    top: '10px',
    left: '10px'
  }, 
}

const FloatingButton = (props) => {
  const { onClick, position, children } = props;

  const style = position === 'bottom-left' ? 
                styles.bottomLeft : 
                position === 'top-left' ? 
                styles.bottomLeft :
                position === 'top-right' ? 
                styles.bottomLeft :
                styles.bottomRight

  return (
    <CircleButton
      onClick={onClick}
      style={style}
    >
      { children }
    </CircleButton>
  );
}

export default FloatingButton;




