import { List, Map } from 'immutable';
import toDoEntryReducer from '../../reducers/toDoEntryReducer';
import * as actions from '../../actions/toDoEntryActions';

import toDoEntry from '../../__test_utils/dataEntryMock';

describe('TODO ENTRY REDUCER TESTS', () => {
  const state = List();
  it('should return an initial state', () => {
    expect(toDoEntryReducer(undefined, {})).toEqual(state);
  });
  it('should create an entry', () => {
    const expected = List().push(Map(toDoEntry));
    expect(toDoEntryReducer(state, actions.createEntry(toDoEntry))).toEqual(expected);
  });
  it('should update the matching entry', () => {
    const INITIAL_STATE = List().push(Map(toDoEntry));
    const update = {
      id: 1,
      name: 'The new name',
      description: 'The new description',
      date: 'Sat Mar 28 2020 18:42:22 GMT+0000 (Greenwich Mean Time)',
    };
    const expectedObject = { ...toDoEntry, name: 'The new name', description: 'The new description' };
    const expected = List().push(Map(expectedObject));
    expect(toDoEntryReducer(INITIAL_STATE, actions.updateEntry(update))).toEqual(expected);
  });
  it('should NOT update the unmatched entry', () => {
    const INITIAL_STATE = List().push(Map(toDoEntry));
    const update = {
      id: 2,
      name: 'The new name',
      description: 'The new description',
      date: 'Sat Mar 28 2020 18:42:22 GMT+0000 (Greenwich Mean Time)',
    };
    const expectedObject = { ...toDoEntry };
    const expected = List().push(Map(expectedObject));
    expect(toDoEntryReducer(INITIAL_STATE, actions.updateEntry(update))).toEqual(expected);
  });
  it('should delete the entry', () => {
    const INITIAL_STATE = List().push(Map(toDoEntry));
    const entryToDel = 1;
    const expected = List();
    expect(toDoEntryReducer(INITIAL_STATE, actions.deleteEntry(entryToDel))).toEqual(expected);
  });
});
