import * as types from '../../types/appStateTypes';

describe('APP STATE TYPES TESTS', () => {
  it('should contain recording action type', () => {
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
