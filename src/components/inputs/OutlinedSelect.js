import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    color: "black",
  }
});

const OutlinedSelect = (props) => {
  const {
    classes,
    value,
    onChange,
    label,
    id,
    options
  } = props;

  return (
    <div className={classes.root}>
      <TextField
        id={id}
        select
        label={label}
        style={{
          margin: 8,
          flex: 1
        }}
        value={value}
        onChange={onChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        InputProps={{
          className: classes.input
        }}
        margin="normal"
        variant="outlined"
        
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}


OutlinedSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(OutlinedSelect);