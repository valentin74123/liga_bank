import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

const SuccessMessage = (props) => {
  const {onButtonClick} = props;

  return (
    <FocusTrap>
      <div className="success-message">
        <h3 className="success-message__title text-margin">Спасибо за обращение в наш банк.</h3>
        <p className="success-message__text text-margin">Наш менеджер скоро свяжется с вами по указанному номеру телефона.</p>

        <button className="success-message__button button-close" onClick={onButtonClick} aria-label="Закрыть"></button>
      </div>
    </FocusTrap>
  );
};

SuccessMessage.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default SuccessMessage;
