import * as types from '../types/appStateTypes';

export const recording = () => ({ type: types.RECORDING });
export const playing = () => ({ type: types.PLAYING });
export const idle = () => ({ type: types.IDLE });
