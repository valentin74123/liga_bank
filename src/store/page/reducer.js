import {createReducer} from '@reduxjs/toolkit';
import {setViewport, setStep, incrementRequest, setPopup} from '../actions';

const initialState = {
  viewport: ``,
  formStep: 1,
  popup: null,
  requestNumber: 10,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementRequest, (state) => {
      state.requestNumber++;
    })
    .addCase(setStep, (state, action) => {
      state.formStep = action.payload;
    })
    .addCase(setViewport, (state, action) => {
      state.viewport = action.payload;
    })
    .addCase(setPopup, (state, action) => {
      state.popup = action.payload;
    });
});

export {reducer};
