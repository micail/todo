/**
* @namespace store
*/

import { createStore, combineReducers, applyMiddleware } from 'redux';

import toDoEntries from './reducers/toDoEntryReducer';
import recordState from './reducers/recordReducer';
import appState from './reducers/appStateReducer';

import { record, loadRecord } from './actions/recordActions';

export const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem('toDoStorage', serializedState);
  } catch (err) {
    return console.log('Error', err);
  }
};

export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('toDoStorage');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return console.log('Error', err);
  }
};

export const clearStorage = () => {
  localStorage.removeItem('toDoStorage');
};

export const recordChange = (ToDoEntries, store) => {
  store.dispatch(record(ToDoEntries));
};


export const hasChanged = (prevToDoEntries, nextToDoEntries, store) => {
  const prevToDoEntriesJSON = JSON.stringify(prevToDoEntries.toJS());
  const nextToDoEntriesJSON = JSON.stringify(nextToDoEntries.toJS());

  if (prevToDoEntriesJSON !== nextToDoEntriesJSON) {
    recordChange(nextToDoEntries, store);
  }
};

const recordMiddleware = (store) => (next) => (action) => {
  const prevState = store.getState();
  const prevToDoEntries = prevState.toDoEntries;

  next(action);

  const nextState = store.getState();
  const nextToDoEntries = nextState.toDoEntries;

  if (prevState.appState !== 'RECORDING' && nextState.appState === 'RECORDING') {
    recordChange(prevToDoEntries, store);
  }
  // Record any change in TODO's if the state is recording
  if (prevState.appState === 'RECORDING') {
    hasChanged(prevToDoEntries, nextToDoEntries, store);
  }
  // Save state to the local storage after recording if the record is not empty
  if (prevState.appState === 'RECORDING' && nextState.appState !== 'RECORDING') {
    saveStateToStorage(nextState.recordState);
  }
};

// Add flag to stop loading already loaded state - make it less expensive
let recordLoadedFromTheState = false;
// Add flag to stop loading if any record exist in the redux store
let recorded = 0;
const loadedState = (store) => (next) => (action) => {
  if (action && action.type === 'CLEAR_RECORD') {
    clearStorage();
  }
  if (recordLoadedFromTheState === false) {
    const prevState = store.getState();
    recorded = prevState.recordState.size;
    next(action);
    if (recorded === 0) {
      const loadFromStorage = loadStateFromStorage();
      if (loadFromStorage !== null) {
        recordLoadedFromTheState = true;
        return store.dispatch(loadRecord(loadFromStorage));
      }
      recordLoadedFromTheState = true;
    }
  }
  return next(action);
};

const applyMid = applyMiddleware(loadedState, recordMiddleware);

/**
 * Creates a new Redux store
 * @memberof store
 * @param routerMiddleware - router middleware
 * @param moreReducers {Object} - extra reducers to add for extending purposes only
 * @param moreMiddleware {Array<function>} - extra middleware to add for extending purposes only
 * @returns {Store<any>}
 */
const makeStore = () => createStore(combineReducers(
  {
    toDoEntries,
    recordState,
    appState,
  },
), applyMid);

export default makeStore;
