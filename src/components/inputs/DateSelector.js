import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    color: "black"
  }
});

const OutlineDateSelector = (props) => {
  const {
    classes,
    value,
    onChange,
    label,
    id,
    maxDate,
    minDate
  } = props;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          id={id}
          label={label}
          keyboard
          style={{
            margin: 8,
            flex: 1
          }}
          variant="outlined"
          value={value}
          InputProps={{
            className: classes.input
          }}
          onChange={onChange}
          format="MM/DD/YYYY"
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

OutlineDateSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(OutlineDateSelector);