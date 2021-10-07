import React from 'react';
import {useSelector} from 'react-redux';
import {getFormStep} from '../../store/page/selectors';

import CreditPurpose from '../credit-purpose/credit-purpose';
import CreditParameters from '../credit-parameters/credit-parameters';
import CreditOffer from '../credit-offer/credit-offer';
import RequestForm from '../request-form/request-form';

import "./style.scss";

const CreditCalculator = () => {
  const step = useSelector(getFormStep);
  const isStepTwoShown = step > 1;
  const isStepThreeShown = step > 2;

  return (
    <section className="credit-calculator" id="calculator">
      <div className="credit-calculator__wrapper">
        <h2 className="credit-calculator__title">Кредитный калькулятор</h2>

        <div className="credit-calculator__container">
          <div className="credit-calculator__parameters">
            <div className="credit-calculator__step step">
              <h3 className="step__title">Шаг 1. Цель кредита</h3>

              <CreditPurpose className="step__form" />
            </div>

            {isStepTwoShown && (
              <div className="credit-calculator__step step">
                <h3 className="step__title">Шаг 2. Введите параметры кредита</h3>

                <CreditParameters className="step__form" />
              </div>
            )}
          </div>

          <div className="credit-calculator__offer">
            {isStepTwoShown && <CreditOffer />}
          </div>
        </div>

        {isStepThreeShown &&
        <div className="credit-calculator__step">
          <RequestForm />
        </div>}
      </div>
    </section>
  );
};

export default CreditCalculator;
