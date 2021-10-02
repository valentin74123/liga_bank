import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {clearNumber} from '../../utils';

const constrainValue = (value, min, max) => {
  switch (true) {
    case value > max:
      return max;
    case value < min:
      return min;
    default:
      return value;
  }
};

const CreditRangeField = (props) => {
  const {children, currentValue, isDisabled, fieldName, fieldUnit,
    label, max, min, onChange} = props;

  const onInputBlur = useCallback(({target}) => {
    const value = constrainValue(clearNumber(target.value), min, max);
    if (currentValue === value) {
      target.value = currentValue.toLocaleString(`ru-RU`);
    } else {
      onChange(value);
    }
  }, [currentValue, max, min, onChange]);

  return (
    <div className="credit-price-field">
      <label className="credit-price-field__label" htmlFor={fieldName}>{label}</label>
      <div className="credit-price-field__wrapper">
        <NumberFormat
          id={fieldName}
          type="text"
          name={fieldName}
          value={currentValue}
          disabled={isDisabled}
          onBlur={onInputBlur}
          thousandSeparator=" "
        />

        <span className="credit-price-field__units">{fieldUnit}</span>
      </div>
      {children}
    </div>
  );
};

CreditRangeField.propTypes = {
  children: PropTypes.element,
  currentValue: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldUnit: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CreditRangeField;
