import {NameSpace} from '../root-reducer';

export const getViewport = (state) => state[NameSpace.PAGE].viewport;
export const getFormStep = (state) => state[NameSpace.PAGE].formStep;
export const getRequestNumber = (state) => state[NameSpace.PAGE].requestNumber;
