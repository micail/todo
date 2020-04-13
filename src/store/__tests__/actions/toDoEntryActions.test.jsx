import * as types from '../../types/toDoTypes';
import * as actions from '../../actions/toDoEntryActions';

import toDoEntry from '../../__test_utils/dataEntryMock';

describe('TO DO ENTRY ACTION TESTS', () => {
  it('should contain an action to create an entry', () => {
    const expected = {
      type: types.CREATE_TODO_ENTRY,
      entry: toDoEntry,
    };
    expect(actions.createEntry(toDoEntry)).toEqual(expected);
  });
  it('should contain an action to update the entry', () => {
    const expected = {
      type: types.UPDATE_TODO_ENTRY,
      entry: toDoEntry,
    };
    expect(actions.updateEntry(toDoEntry)).toEqual(expected);
  });
  it('should contain an action to delete the entry', () => {
    const expected = {
      type: types.DELETE_TODO_ENTRY,
      id: 1,
    };
    expect(actions.deleteEntry(1)).toEqual(expected);
  });
  it('should contain an action to clear the state', () => {
    const expected = {
      type: types.CLEAR_ENTRIES,
    };
    expect(actions.clearEntries()).toEqual(expected);
  });
});
