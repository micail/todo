import * as types from '../../types/appStateTypes';
import * as actions from '../../actions/appState';

describe('APP STATE ACTION TEST', () => {
  it('should contain an action to record', () => {
    const expected = {
      type: types.RECORDING,
    };
    expect(actions.recording()).toEqual(expected);
  });
  it('should contain an action play record', () => {
    const expected = {
      type: types.PLAYING,
    };
    expect(actions.playing()).toEqual(expected);
  });
  it('should contain iddle action ', () => {
    const expected = {
      type: types.IDLE,
    };
    expect(actions.idle()).toEqual(expected);
  });
});
