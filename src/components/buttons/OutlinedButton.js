import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: '55px',
  },
  input: {
    display: 'none',
  },
});

function OutlinedButton(props) {
  const { classes, text, onClick } = props;
  return (
    <Button
      onClick={onClick}
      variant="outlined" 
      color="primary" 
      className={classes.button}>
      {text}
    </Button>
  );
}

OutlinedButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButton);