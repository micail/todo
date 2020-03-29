import * as types from '../../types/toDoTypes';
import * as actions from '../../actions/toDoEntryActions';
import toDoEntry from '../../__test_utils/dataEntryMock';

describe('TO DO ENTRY ACTION TEST', () => {
  it('should contain an action to create the entry', () => {
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
});
