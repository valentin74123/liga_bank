import {combineReducers} from 'redux';
import {reducer as pageReducer} from './page/reducer';
import {reducer as creditReducer} from './credit/reducer';

export const NameSpace = {
  PAGE: `PAGE`,
  CREDIT: `CREDIT`,
};

export const rootReducer = combineReducers({
  [NameSpace.PAGE]: pageReducer,
  [NameSpace.CREDIT]: creditReducer,
});
