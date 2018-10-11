import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

const SimpleSlider = (props) => {
  const { classes, min, max, step, value, onChange, onDragStart, onDragEnd } = props;

  return (
    <div className={classes.root}>
      <Slider
        aria-labelledby="label"
        classes={{ container: classes.slider }}
        value={value}
        onChange={onChange}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styles)(SimpleSlider);