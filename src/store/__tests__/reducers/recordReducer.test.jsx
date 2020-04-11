import { List, Map } from 'immutable';
import record from '../../reducers/recordReducer';
import * as actions from '../../actions/recordActions';

import toDoEntry from '../../__test_utils/dataEntryMock';

describe('RECORD REDUCER TESTS', () => {
  const state = List();
  it('should return an initial state', () => {
    expect(record(undefined, {})).toEqual(state);
  });
  it('should record TODO store state', () => {
    const data = List().push(Map(toDoEntry));
    const expected = List().push(data);
    expect(record(state, actions.record(data))).toEqual(expected);
  });
  it('should clear the record', () => {
    const INITIAL_STATE = List();
    expect(record(state, actions.clearRecord())).toEqual(INITIAL_STATE);
  });
  it('should load the record', () => {
    const data = List().push(Map(toDoEntry));
    expect(record(state, actions.loadRecord(data))).toEqual(data);
  });
});
