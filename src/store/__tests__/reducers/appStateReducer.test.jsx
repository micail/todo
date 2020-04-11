import appStateReducer from '../../reducers/appStateReducer';
import * as actions from '../../actions/appState';

describe('APP STATE REDUCER TESTS', () => {
  const state = '';
  it('should return an initial state', () => {
    expect(appStateReducer(undefined, {})).toEqual(state);
  });
  it('should change state value to RECORDING', () => {
    const expected = 'RECORDING';
    expect(appStateReducer(state, actions.recording())).toEqual(expected);
  });
  it('should change state value to PLAYING', () => {
    const expected = 'PLAYING';
    expect(appStateReducer(state, actions.playing())).toEqual(expected);
  });
  it('should change state value to IDLE', () => {
    const expected = 'IDLE';
    expect(appStateReducer(state, actions.idle())).toEqual(expected);
  });
});
