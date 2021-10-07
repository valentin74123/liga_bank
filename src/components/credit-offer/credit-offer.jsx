import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CreditType, CreditData} from '../../const';
import {formatMoneyString} from '../../utils';
import {setStep} from '../../store/actions';
import {getCreditType, getValidityStatus, selectIsValidLoanSum, selectLoanSum,
  selectMinIncome, selectMonthlyPayment, selectPercentRate} from '../../store/credit/selectors';
import {getFormStep} from '../../store/page/selectors';

import "./style.scss";

const typeToText = {
  [CreditType.AUTO]: `автокредита`,
  [CreditType.HOME]: `ипотеки`,
};

const typeToMessage = {
  [CreditType.AUTO]: `автокредиты`,
  [CreditType.HOME]: `ипотечные кредиты`,
};

const CreditOffer = () => {
  const creditType = useSelector(getCreditType);
  const {minLoanSum} = CreditData[creditType];

  const isValidPrice = useSelector(getValidityStatus);
  const isValidLoan = useSelector(selectIsValidLoanSum);

  const loanSum = useSelector(selectLoanSum);
  const percentRate = useSelector(selectPercentRate).toFixed(2).replace(`.`, `,`);
  const monthlyPayment = useSelector(selectMonthlyPayment);
  const monthlyIncome = useSelector(selectMinIncome);

  const formStep = useSelector(getFormStep);

  const isDisabled = formStep === 3;

  const dispatch = useDispatch();

  const onButtonClick = useCallback(() => dispatch(setStep(3)), [dispatch]);

  const renderContent = () => {
    if (!isValidPrice) {
      return (
        <h3 className="credit-offer__title">Наше предложение</h3>
      );
    }

    if (!isValidLoan) {
      return (
        <>
          <h3 className="credit-offer__title">Наш банк не выдает {typeToMessage[creditType]} меньше {minLoanSum.toLocaleString(`ru-RU`)} рублей.</h3>
          <p className="credit-offer__text">Попробуйте использовать другие параметры для расчета.</p>
        </>
      );
    }

    return (
      <>
        <h3 className="credit-offer__title">Наше предложение</h3>

        <dl className="credit-offer__details">
          <div className="credit-offer__item">
            <dt>{formatMoneyString(loanSum)}</dt>
            <dd>Сумма {typeToText[creditType]}</dd>
          </div>

          <div className="credit-offer__item">
            <dt>{percentRate}%</dt>
            <dd>Процентная ставка</dd>
          </div>

          <div className="credit-offer__item">
            <dt>{formatMoneyString(monthlyPayment)}</dt>
            <dd>Ежемесячный платеж</dd>
          </div>

          <div className="credit-offer__item">
            <dt>{formatMoneyString(monthlyIncome)}</dt>
            <dd>Необходимый доход</dd>
          </div>
        </dl>

        <button onClick={onButtonClick} className="credit-offer__button" type="button" disabled={isDisabled}>
          Оформить заявку
        </button>
      </>
    );
  };

  return (
    <section className="credit-offer">
      <div className="credit-offer__container">
        {renderContent()}
      </div>
    </section>
  );
};

export default CreditOffer;
