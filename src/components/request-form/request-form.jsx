import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import {CreditType, StorageField} from '../../const';
import {getCreditType, getInitialPayment, getPeriod, getTotalSum} from '../../store/credit/selectors';
import {getRequestNumber} from '../../store/page/selectors';
import {formatMoneyString, formatRequestNumber, getPeriodLabel, getClassName} from '../../utils';
import {incrementRequest} from '../../store/actions';

const typeToTitle = {
  [CreditType.AUTO]: `Автокредит`,
  [CreditType.HOME]: `Ипотека`,
};

const typeToLabel = {
  [CreditType.AUTO]: `Стоимость автомобиля`,
  [CreditType.HOME]: `Стоимость недвижимости`,
};

const RequestForm = () => {
  const requestNumber = useSelector(getRequestNumber);
  const creditType = useSelector(getCreditType);
  const totalPrice = useSelector(getTotalSum);
  const initialPayment = useSelector(getInitialPayment);
  const period = useSelector(getPeriod);

  const formRef = useRef();

  const [formElement, setFormElement] = useState(null);

  const [isInvalid, setIsInvalid] = useState(false);

  const [currentPhone, setPhone] = useState(``);

  const dispatch = useDispatch();

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const name = formElement.querySelector(`#request-user`).value;
    const phone = formElement.querySelector(`#request-phone`).value;
    const email = formElement.querySelector(`#request-email`).value;

    localStorage.setItem(StorageField.NAME, name);
    localStorage.setItem(StorageField.PHONE, phone);
    localStorage.setItem(StorageField.EMAIL, email);

    dispatch(incrementRequest());
  }, [dispatch, formElement]);

  const handleFormInvalid = useCallback(() => {
    setIsInvalid(true);
    window.setTimeout(() => setIsInvalid(false), 1000);
  }, []);

  const fields = [
    {
      id: `number`,
      text: `Номер заявки`,
      value: formatRequestNumber(requestNumber),
    },
    {
      id: `purpose`,
      text: `Цель кредита`,
      value: typeToTitle[creditType],
    },
    {
      id: `price`,
      text: typeToLabel[creditType],
      value: formatMoneyString(totalPrice),
    },
    {
      id: `initial-payment`,
      text: `Первоначальный взнос`,
      value: formatMoneyString(initialPayment),
    },
    {
      id: `period`,
      text: `Срок кредитования`,
      value: `${period} ${getPeriodLabel(period)}`,
    },
  ];

  useEffect(() => {
    if (formRef.current && formElement === null) {
      const element = formRef.current;
      const inputName = element.querySelector(`#request-user`);
      const inputEmail = element.querySelector(`#request-email`);

      inputName.focus();

      if (localStorage) {
        inputName.value = localStorage.getItem(StorageField.NAME);
        inputEmail.value = localStorage.getItem(StorageField.EMAIL);

        setPhone(localStorage.getItem(StorageField.PHONE));
      }
      setFormElement(element);
    }
  }, [formElement]);

  return (
    <section className={getClassName(
        `request-form`,
        isInvalid && `request-form--shake`
    )}>
      <h3 className="request-form__title">Шаг 3. Оформление заявки</h3>

      <form
        onSubmit={handleFormSubmit}
        ref={formRef}
        action="#"
        method="post"
        id="request-form"
        onInvalid={handleFormInvalid}
      >
        {fields.map(({id, text, value}) => (
          <div key={id} className="request-form__item">
            <label htmlFor={`request-${id}`}>{text}</label>

            <input type="text" id={`request-${id}`} name={`request-${id}`} value={value} readOnly tabIndex="-1"/>
          </div>
        ))}

        <div className="request-form__wrapper">
          <div className="request-form__field request-form__field--user">
            <label htmlFor="request-user" className="visually-hidden">ФИО</label>

            <input type="text" name="request-user" id="request-user" placeholder="ФИО" required/>
          </div>

          <div className="request-form__field request-form__field--contact">
            <label htmlFor="request-phone" className="visually-hidden">Телефон</label>

            <NumberFormat
              id="request-phone"
              name="request-phone"
              format="+7(###) ###-##-##"
              mask="_"
              type="tel"
              pattern="\+7\s?[\(]{0,1}[0-9]{3}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
              placeholder="Телефон"
              value={currentPhone}
              onValueChange={({formattedValue}) => setPhone(formattedValue)}
              required
            />
          </div>

          <div className="request-form__field request-form__field--contact">
            <label htmlFor="request-email" className="visually-hidden">E-mail</label>

            <input type="email" name="request-email" id="request-email" placeholder="E-mail" required/>
          </div>

          <button className="request-form__button button" type="submit">Отправить</button>
        </div>
      </form>
    </section>
  );
};

export default RequestForm;
