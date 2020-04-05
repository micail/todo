import * as types from '../types/appStateTypes';

export const INITIAL_STATE = 'RECORDING';

const appStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECORDING:
      return action.type;
    case types.PLAYING:
      return action.type;
    case types.IDLE:
      return action.type;
    default:
      return state;
  }
};

export default appStateReducer;
