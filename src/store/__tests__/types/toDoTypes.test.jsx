import * as types from '../../types/toDoTypes';

describe('TODO ENTRY TYPES TESTS', () => {
  it('should contain create entry action type', () => {
    const expected = 'CREATE_TODO_ENTRY';
    expect(types.CREATE_TODO_ENTRY).toEqual(expected);
  });
  it('should contain update entry action type', () => {
    const expected = 'UPDATE_TODO_ENTRY';
    expect(types.UPDATE_TODO_ENTRY).toEqual(expected);
  });
  it('should contain delete entry action type', () => {
    const expected = 'DELETE_TODO_ENTRY';
    expect(types.DELETE_TODO_ENTRY).toEqual(expected);
  });
  it('should contain clear entries action type', () => {
    const expected = 'CLEAR_ENTRIES';
    expect(types.CLEAR_ENTRIES).toEqual(expected);
  });
});
