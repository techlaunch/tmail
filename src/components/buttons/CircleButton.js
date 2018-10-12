import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const CircleButton = (props) => {
  const { classes, onClick, style, children } = props;

  return (
    <div>
      <Button 
        variant="fab" 
        color={"secondary"}
        aria-label="Add" 
        className={classes.button}
        onClick={onClick} 
        style={style} 
      >
        {children} 
      </Button>
    </div>
  );
}

CircleButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircleButton);