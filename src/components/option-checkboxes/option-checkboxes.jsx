import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

const OptionCheckboxes = (props) => {
  const {label, title, onChange, isChecked} = props;

  const handleInputChange = useCallback(({target}) => onChange({
    title: target.id,
    isChecked: target.checked,
  }), [onChange]);

  return (
    <div className="option-checkboxes">
      <input className="visually-hidden" type="checkbox" name={title} id={title} onChange={handleInputChange} checked={isChecked} />

      <label htmlFor={title} className="option-checkboxes__label">
        <span className="option-checkboxes__box"/>
        {label}
      </label>
    </div>
  );
};

OptionCheckboxes.propTypes = {
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OptionCheckboxes;
