import * as types from '../../types/appStateTypes';

describe('APP STATE TYPES TEST', () => {
  it('should contain recoringd action type', () => {
    const expected = 'RECORDING';
    expect(types.RECORDING).toEqual(expected);
  });
  it('should contain playing action type', () => {
    const expected = 'PLAYING';
    expect(types.PLAYING).toEqual(expected);
  });
  it('should contain idle action type', () => {
    const expected = 'IDLE';
    expect(types.IDLE).toEqual(expected);
  });
});
