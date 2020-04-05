import { List } from 'immutable';
import RECORD from '../types/recordType';

export const INITIAL_STATE = List();

const recordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORD:
      return state.push(action.toDoS);
    default:
      return state;
  }
};

export default recordReducer;
