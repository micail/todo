import makreStore from '../store';

describe('Store tests', () => {
  const store = makreStore();

  it('should create a new store', () => {
    expect(store).toBeDefined();
  });
});
