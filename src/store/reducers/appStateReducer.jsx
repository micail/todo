/**
* @namespace store.reducers
*/
import * as types from '../types/appStateTypes';

/**
 *  Initial store structure
 *
 *  @type { string }
 *  @memberof store.reducers
 *  @property {string} state - app state
 */
export const INITIAL_STATE = '';

/**
 * Will receive a string to differ state of the app
 * @memberof store.reducers.state
 * @function :  state
 * @param {object} state initial and final state
 * @param {object} action the action object
 */
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
