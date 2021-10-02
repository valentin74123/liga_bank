import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import {StorageField} from '../../const';

const FieldType = {
  TEXT: `text`,
  PASSWORD: `password`,
};

function LoginForm({onButtonClick}) {
  const loginRef = useRef();
  const [loginInput, setLoginInput] = useState(null);

  const [password, setPassword] = useState();

  const [fieldType, setFieldType] = useState(FieldType.PASSWORD);

  useEffect(() => {
    if (loginRef.current && loginInput === null) {
      loginRef.current.focus();
      setLoginInput(loginRef.current);
    }
  }, [loginInput]);

  const handlePasswordChange = useCallback(({target}) => setPassword(target.value), []);

  const handleEyeMouseDown = useCallback(() => setFieldType(FieldType.TEXT), []);
  const handleEyeMouseUp = useCallback(() => setFieldType(FieldType.PASSWORD), []);
  const handleEyeTouchStart = useCallback(() => setFieldType(FieldType.TEXT), []);
  const handleEyeTouchEnd = useCallback(() => setFieldType(FieldType.PASSWORD), []);

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const login = loginInput.value;
    if (localStorage) {
      localStorage.setItem(StorageField.LOGIN, login);
      localStorage.setItem(StorageField.PASSWORD, password);
    }
    onButtonClick();
  }, [loginInput, onButtonClick, password]);

  return (
    <FocusTrap>
      <section className="login-form">
        <h3 className="visually-hidden">Вход в клиент-банк.</h3>

        <div className="login-form__logo">
          <img src="./img/logo-login.svg" width="150" height="27" alt="Клиент-банк Лига-банка" />
        </div>

        <button className="login-form__close button-close" onClick={onButtonClick} aria-label="Закрыть" />

        <form className="login-form__form" action="" method="post" id="login-form-form" onSubmit={handleFormSubmit}>
          <div className="login-form__field">
            <label htmlFor="login-form">Логин</label>
            <input
              ref={loginRef}
              type="text"
              id="login"
              name="login"
              autoComplete="off"
              required
            />
          </div>

          <div className="login-form__field">
            <label htmlFor="password">Пароль</label>
            <input
              type={fieldType}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <button
              className="login-form__toggle-password" type="button"
              aria-label="Показать пароль"
              onMouseDown={handleEyeMouseDown}
              onMouseUp={handleEyeMouseUp}
              onTouchStart={handleEyeTouchStart}
              onTouchEnd={handleEyeTouchEnd}
            />
          </div>

          <Link className="login-form__link" to="/">Забыли пароль?</Link>

          <button className="login-form__submit button" type="submit">Войти</button>
        </form>
      </section>
    </FocusTrap>
  );
}

LoginForm.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default LoginForm;
