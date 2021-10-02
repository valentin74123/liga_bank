import {createReducer} from '@reduxjs/toolkit';
import {setCreditType, setInitialPayment, setPeriod, setTotalPrice, setInitialPaymentRate, setValidStatus, ActionType, setCasco, setLifeInsurance, setMatCapital, resetOptions} from '../actions';
import {getPaymentByRate, getRateByPayment} from '../../utils';

const initialState = {
  creditType: undefined,
  initialPayment: undefined,
  initialPaymentRate: undefined,
  isCasco: false,
  isLifeInsurance: false,
  isMatCapital: false,
  isValidPrice: true,
  period: undefined,
  totalPrice: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetOptions, (state) => {
      state.isCasco = false;
      state.isLifeInsurance = false;
      state.isMatCapital = false;
    })
    .addCase(setCreditType, (state, action) => {
      state.creditType = action.payload;
    })
    .addCase(setInitialPayment, (state, action) => {
      state.initialPayment = action.payload;
    })
    .addCase(setInitialPaymentRate, (state, action) => {
      state.initialPaymentRate = action.payload;
    })
    .addCase(setPeriod, (state, action) => {
      state.period = action.payload;
    })
    .addCase(setCasco, (state, action) => {
      state.isCasco = action.payload;
    })
    .addCase(setLifeInsurance, (state, action) => {
      state.isLifeInsurance = action.payload;
    })
    .addCase(setMatCapital, (state, action) => {
      state.isMatCapital = action.payload;
    })
    .addCase(setTotalPrice, (state, action) => {
      state.totalPrice = action.payload;
    })
    .addCase(setValidStatus, (state, action) => {
      state.isValidPrice = action.payload;
      state.initialPayment = !action.payload && 0;
    })
    .addCase(ActionType.UPDATE_INITIAL_PAYMENT, (state) => {
      state.initialPayment = getPaymentByRate(state.totalPrice, state.initialPaymentRate);
    })
    .addCase(ActionType.UPDATE_INITIAL_PAYMENT_RATE, (state) => {
      state.initialPaymentRate = getRateByPayment(state.totalPrice, state.initialPayment);
    });
});

export {reducer};
