import {combineReducers} from 'redux';
import {reducer as pageReducer} from './page/reducer';

export const NameSpace = {
  PAGE: `PAGE`,
};

export const rootReducer = combineReducers({
  [NameSpace.PAGE]: pageReducer,
});
