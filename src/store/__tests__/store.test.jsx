import makeStore from '../store';

describe('Store tests', () => {
  const store = makeStore();

  it('should create a new store', () => {
    expect(store).toBeDefined();
  });
});
