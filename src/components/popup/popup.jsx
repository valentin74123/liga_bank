import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ESC_KEY, PopupType} from '../../const';
import {getBodyScrollTop, isVerticalScroll} from '../../utils';

import LoginForm from '../login-form/login-form';
import SuccessMessage from '../success-message/success-message';

import "./style.scss";

const Popup = (props) => {
  const {id, onClose} = props;

  const pageTopPosition = getBodyScrollTop();
  const pageLeftPosition = document.body.offsetLeft;

  const handleEscKeyDown = useCallback((evt) => {
    if (evt.key === ESC_KEY) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener(`keydown`, handleEscKeyDown);
    return () => document.removeEventListener(`keydown`, handleEscKeyDown);
  }, [handleEscKeyDown]);

  useEffect(() => {
    if (isVerticalScroll()) {
      document.body.style.top = `-${pageTopPosition}px`;
      document.body.classList.add(`page--lock`);
    }

    return () => {
      if (isVerticalScroll()) {
        document.body.classList.remove(`page--lock`);
        document.body.style = void 0;
        window.scrollTo(0, pageTopPosition);
      }
    };
  }, [pageLeftPosition, pageTopPosition]);

  const renderContent = useCallback((type) => {
    switch (type) {
      case PopupType.LOGIN:
        return (
          <LoginForm onButtonClick={onClose} />
        );
      case PopupType.SUCCESS_MESSAGE:
        return (
          <SuccessMessage onButtonClick={onClose} />
        );
      default:
        return null;
    }
  }, [onClose]);

  return (
    <div className="popup">
      {renderContent(id)}
    </div>
  );
};

Popup.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
