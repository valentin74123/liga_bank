import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const RangeSlider = (props) => {
  const {className, formatLabel, initialValue, isDisabled, minValue,
    maxValue, name, onRangeChange, step} = props;

  const [currentValue, setCurrentValue] = useState(null);
  const onChange = useCallback((value) => {
    setCurrentValue(value);
    onRangeChange(value);
  }, [onRangeChange]);

  useEffect(() => {
    return initialValue && setCurrentValue(initialValue);
  }, [initialValue]);

  if (currentValue) {
    return (
      <div className={className}>
        <InputRange
          disabled={isDisabled}
          formatLabel={formatLabel}
          minValue={minValue}
          maxValue={maxValue}
          name={name}
          step={step}
          onChange={onChange}
          value={currentValue}
        />
      </div>
    );
  }

  return null;
};

RangeSlider.propTypes = {
  className: PropTypes.string,
  formatLabel: PropTypes.func,
  initialValue: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  step: PropTypes.number,
};

export default RangeSlider;
