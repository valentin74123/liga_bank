import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';

import {AUTO_TOTAL_PRICE_FOR_DISCOUNT, CreditData, CreditType, HOME_FIRST_PAYMENT_RATE_FOR_DISCOUNT, INCOME_RATE, MAT_CAPITAL, Percentage} from '../../const';
import {getAnnuityPayment} from '../../utils';

export const getCreditType = (state) => state[NameSpace.CREDIT].creditType;

export const getTotalSum = (state) => state[NameSpace.CREDIT].totalPrice;

export const getInitialPayment = (state) => state[NameSpace.CREDIT].initialPayment;

export const getPaymentRate = (state) => state[NameSpace.CREDIT].initialPaymentRate;

export const getPeriod = (state) => state[NameSpace.CREDIT].period;

export const getValidityStatus = (state) => state[NameSpace.CREDIT].isValidPrice;

export const getMatCapitalStatus = (state) => state[NameSpace.CREDIT].isMatCapital;

export const getCascoStatus = (state) => state[NameSpace.CREDIT].isCasco;

export const getLifeInsuranceStatus = (state) => state[NameSpace.CREDIT].isLifeInsurance;

export const selectLoanSum = createSelector(
    getCreditType,
    getTotalSum,
    getInitialPayment,
    getMatCapitalStatus,
    (type, totalSum, initialPayment, isMatCapital) => {
      if (type === CreditType.HOME && isMatCapital) {
        return totalSum - initialPayment - MAT_CAPITAL;
      }
      return totalSum - initialPayment;
    },
);

export const selectIsValidLoanSum = createSelector(
    getCreditType,
    selectLoanSum,
    (type, sum) => sum >= CreditData[type].minLoanSum,
);

const selectAutoPercentRate = createSelector(
    getTotalSum,
    getCascoStatus,
    getLifeInsuranceStatus,
    (price, isCasco, isLifeInsurance) => {
      if (isCasco && isLifeInsurance) {
        return Percentage.AUTO_MIN;
      }
      if (isCasco || isLifeInsurance) {
        return Percentage.AUTO_WITH_OPTION;
      }
      if (price >= AUTO_TOTAL_PRICE_FOR_DISCOUNT) {
        return Percentage.AUTO_DISCOUNT;
      }
      return Percentage.AUTO_DEFAULT;
    },
);

const selectHomePercentRate = createSelector(
    getPaymentRate,
    (rate) => (rate < HOME_FIRST_PAYMENT_RATE_FOR_DISCOUNT) ? Percentage.HOME_DEFAULT : Percentage.HOME_DISCOUNT,
);

export const selectPercentRate = createSelector(
    getCreditType,
    selectAutoPercentRate,
    selectHomePercentRate,
    (type, autoRate, homeRate) => {
      switch (type) {
        case CreditType.AUTO:
          return autoRate;
        case CreditType.HOME:
          return homeRate;
        default:
          return 0;
      }
    },
);

export const selectMonthlyPayment = createSelector(
    getPeriod,
    selectLoanSum,
    selectPercentRate,
    (period, loanSum, rate) => getAnnuityPayment(loanSum, rate, period),
);

export const selectMinIncome = createSelector(
    selectMonthlyPayment,
    (payment) => Math.round(payment / INCOME_RATE),
);
