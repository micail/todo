import { List } from 'immutable';
import makeStore, { recordChange, saveState, loadState } from '../store';

import * as toDoActions from '../actions/toDoEntryActions';
import * as stateActions from '../actions/appState';

describe('Local storage test', () => {
  it('should dispatch record from local storage', async () => {
    const data = { foo: 'bar2' };
    const str = JSON.stringify(data);
    await localStorage.setItem('toDoStorage', str);
    const store = makeStore();
    store.dispatch(stateActions.idle());
    expect(JSON.stringify(store.getState())).toContain('bar2');
  });
});

describe('Store tests test', () => {
  it('should create a new store', () => {
    const store = makeStore();
    expect(store).toBeDefined();
  });
  it('should discover a change in the state', () => {
    const store = makeStore();
    const prevToDo = List([{ foo: 'foo' }]);
    const nextToDo = List([{ bar: 'bar' }]);
    recordChange(prevToDo, nextToDo, store);
    const storeState = JSON.stringify(store.getState().recordState);
    expect(storeState).toContain('bar');
  });
  it('should record any change of ToDos if recording', () => {
    const store = makeStore();
    const toDoS = { name: 'Foo Bar' };
    store.dispatch(stateActions.recording());
    store.dispatch(toDoActions.createEntry(toDoS));
    const storeState = JSON.stringify(store.getState().recordState);
    expect(storeState).toContain('Foo Bar');
  });
  it('should call save to local storage after rocording', async () => {
    const store = makeStore();
    const toDoS = { name: 'Foo Bar' };
    store.dispatch(stateActions.recording());
    store.dispatch(toDoActions.createEntry(toDoS));
    store.dispatch(stateActions.idle());
    expect(saveState).toBeDefined();
  });
  it('should save to local storage and load', () => {
    const data = { foo: 'bar' };
    const dataString = JSON.stringify(data);
    saveState(data);
    expect(localStorage.getItem('toDoStorage')).toEqual(dataString);
  });
  it('should load from local storage', () => {
    const data = { foo: 'bar' };
    const dataString = JSON.stringify(data);
    loadState();
    expect(localStorage.getItem('toDoStorage')).toEqual(dataString);
  });
});

