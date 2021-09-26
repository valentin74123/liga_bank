import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  SET_VIEWPORT: `PAGE/SET_VIEWPORT`,
};

export const setViewport = createAction(ActionType.SET_VIEWPORT, (viewport) => ({
  payload: viewport,
}));
