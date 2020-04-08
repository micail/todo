import * as types from '../../types/recordTypes';

describe('RECORD TYPES TEST', () => {
  it('should contain record action type', () => {
    const expected = 'RECORD';
    expect(types.RECORD).toEqual(expected);
  });
  it('should contain clear record action type', () => {
    const expected = 'CLEAR_RECORD';
    expect(types.CLEAR_RECORD).toEqual(expected);
  });
  it('should contain load record action type', () => {
    const expected = 'LOAD_RECORD';
    expect(types.LOAD_RECORD).toEqual(expected);
  });
});
