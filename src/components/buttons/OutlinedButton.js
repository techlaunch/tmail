import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"; 

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
  const { classes, text, onClick, href } = props;
  return (
    <Button
      onClick={onClick}
      variant="outlined" 
      color="primary" 
      className={classes.button}>
      <Link to={href || ''} style={{
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      }}>
        {text}
      </Link>
    </Button>
  );
}

OutlinedButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButton);