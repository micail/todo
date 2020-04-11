import * as types from '../../types/recordTypes';
import * as actions from '../../actions/recordActions';

describe('RECORD ACTION TESTS', () => {
  it('should contain an action to record TODO reducer state', () => {
    const expected = {
      type: types.RECORD,
    };
    expect(actions.record()).toEqual(expected);
  });
  it('should contain an action play the record', () => {
    const expected = {
      type: types.LOAD_RECORD,
    };
    expect(actions.loadRecord()).toEqual(expected);
  });
  it('should contain iddle action', () => {
    const expected = {
      type: types.CLEAR_RECORD,
    };
    expect(actions.clearRecord()).toEqual(expected);
  });
});
