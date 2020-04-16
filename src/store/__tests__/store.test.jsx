import { List } from 'immutable';
import makeStore, {
  hasChanged,
  saveStateToStorage,
  loadStateFromStorage,
} from '../store';

import * as toDoActions from '../actions/toDoEntryActions';
import * as stateActions from '../actions/appState';
import * as recordActions from '../actions/recordActions';

describe('LOCAL STORAGE TESTS', () => {
  it('should dispatch record from the local storage', async () => {
    const data = { foo: 'bar2' };
    const str = JSON.stringify(data);
    await localStorage.setItem('toDoStorage', str);
    const store = makeStore();
    store.dispatch(stateActions.idle());
    expect(JSON.stringify(store.getState())).toContain('bar2');
  });
});

describe('REDUX STORE TESTS', () => {
  it('should create a new store', () => {
    const store = makeStore();
    expect(store).toBeDefined();
  });

  it('should discover a change in the state', () => {
    const store = makeStore();
    const prevToDo = List([{ foo: 'foo' }]);
    const nextToDo = List([{ bar: 'bar' }]);
    hasChanged(prevToDo, nextToDo, store);
    const storeState = JSON.stringify(store.getState().recordState);
    expect(storeState).toContain('bar');
  });

  it('should record any change of TODOs if recording', () => {
    const store = makeStore();
    const toDoS = { name: 'Foo Bar' };
    store.dispatch(stateActions.recording());
    store.dispatch(toDoActions.createEntry(toDoS));
    const storeState = JSON.stringify(store.getState().recordState);
    expect(storeState).toContain('Foo Bar');
  });

  it('should call save to local storage after recording', async () => {
    const store = makeStore();
    const toDoS = { name: 'Foo Bar' };
    store.dispatch(stateActions.recording());
    store.dispatch(toDoActions.createEntry(toDoS));
    store.dispatch(stateActions.idle());
    expect(saveStateToStorage).toBeDefined();
  });

  it('should save to local storage and load', () => {
    const data = { foo: 'bar' };
    const dataString = JSON.stringify(data);
    saveStateToStorage(data);
    expect(localStorage.getItem('toDoStorage')).toEqual(dataString);
  });

  it('should load from local storage', () => {
    const data = { foo: 'bar' };
    const dataString = JSON.stringify(data);
    loadStateFromStorage();
    expect(localStorage.getItem('toDoStorage')).toEqual(dataString);
  });

  it('should log an error if there is no local storage', () => {
    console.log = jest.fn();
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('Error');
    });
    const data = { foo: 'bar' };
    const dataString = JSON.stringify(data);
    saveStateToStorage(dataString);
    expect(console.log.mock.calls[0][0]).toBe('Error');
  });

  it('should log an error if can not load from the local storage', () => {
    console.log = jest.fn();
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error('Error');
    });
    loadStateFromStorage();
    expect(console.log.mock.calls[0][0]).toBe('Error');
  });

  it('should return null if there is no data in the storage', () => {
    console.log = jest.fn();
    Storage.prototype.getItem = jest.fn(() => null);
    expect(loadStateFromStorage()).toBe(null);
  });

  it('should clear storage', () => {
    const store = makeStore();
    const data = { foo: 'bar' };
    saveStateToStorage(data);
    store.dispatch(recordActions.clearRecord());
    expect(localStorage.getItem('toDoStorage')).toEqual(null);
  });
});
