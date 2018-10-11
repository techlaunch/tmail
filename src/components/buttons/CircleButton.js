import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IoIosSend } from 'react-icons/io';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const CircleButton = (props) => {
  const { classes, onSendMessage } = props;

  return (
    <div>
      <Button 
        variant="fab" 
        color={"secondary"}
        aria-label="Add" 
        className={classes.button}
        onClick={onSendMessage}  
      >
        <IoIosSend />
      </Button>
    </div>
  );
}

CircleButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircleButton);