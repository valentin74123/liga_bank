import {createReducer} from '@reduxjs/toolkit';
import {setViewport} from '../actions';

const initialState = {
  viewport: ``,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setViewport, (state, action) => {
      state.viewport = action.payload;
    });
});

export {reducer};
