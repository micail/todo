import * as types from '../../types/appStateTypes';
import * as actions from '../../actions/appState';

describe('APP STATE ACTION TESTS', () => {
  it('should contain an action to change state to recording', () => {
    const expected = {
      type: types.RECORDING,
    };
    expect(actions.recording()).toEqual(expected);
  });
  it('should contain an action to change state to playing', () => {
    const expected = {
      type: types.PLAYING,
    };
    expect(actions.playing()).toEqual(expected);
  });
  it('should contain an action to change state to idle', () => {
    const expected = {
      type: types.IDLE,
    };
    expect(actions.idle()).toEqual(expected);
  });
});
