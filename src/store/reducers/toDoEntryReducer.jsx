import { Map, List } from 'immutable';
import * as types from '../types/toDoTypes';

export const INITIAL_STATE = List();

const toDoEntryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_TODO_ENTRY:
      return state.push(Map(action.entry));
    case types.UPDATE_TODO_ENTRY:
      return state.map((entry) => {
        if (entry.get('id') === action.entry.id) {
          return entry.set('description', action.entry.description)
            .set('name', action.entry.name);
        }
        return entry;
      });
    case types.DELETE_TODO_ENTRY:
      return state.filter((entry) => (entry.get('id') !== action.id));
    case types.CLEAR_ENTRIES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default toDoEntryReducer;
