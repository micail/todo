import { List } from 'immutable';
import { RECORD, CLEAR_RECORD, LOAD_RECORD } from '../types/recordType';

export const INITIAL_STATE = List();

const recordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORD:
      return state.push(action.toDoS);
    case CLEAR_RECORD:
      return INITIAL_STATE;
    case LOAD_RECORD:
      return state.merge(action.recorded);
    default:
      return state;
  }
};

export default recordReducer;
