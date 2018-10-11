import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    color: "black"
  }
});

const OutlinedInput = (props) => {
  const { 
    classes, 
    value, 
    onChange, 
    onKeyPress,
    label,
    id,
    placeholder,
    type
  } = props;

  return (
    <div className={classes.root}>
      <TextField
        id={id}
        label={label}
        type={type || 'text'}
        style={{ 
          margin: 8,
          flex: 1
        }}
        placeholder={placeholder}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          className: classes.input
        }}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

OutlinedInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(OutlinedInput);