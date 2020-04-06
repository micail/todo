/**
* @namespace store
*/

import { createStore, combineReducers, applyMiddleware } from 'redux';

import toDoEntries from './reducers/toDoEntryReducer';
import recordState from './reducers/recordReducer';
import appState from './reducers/appStateReducer';

import { record, loadRecord } from './actions/recordActions';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem('toDoStorage', serializedState);
  } catch (err) {
    return console.log('Error', err);
  }
};

const loadState = () => {
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


const recordChange = (prevToDoEntries, nextToDoEntries, store) => {
  const prevToDoEntriesJSON = JSON.stringify(prevToDoEntries.toJS());
  const nextToDoEntriesJSON = JSON.stringify(nextToDoEntries.toJS());

  if (prevToDoEntriesJSON !== nextToDoEntriesJSON) {
    store.dispatch(record(nextToDoEntries));
  }
};

const recordMiddleware = (store) => (next) => (action) => {
  const prevState = store.getState();
  const prevToDoEntries = prevState.toDoEntries;

  next(action);

  const nextState = store.getState();
  const nextToDoEntries = nextState.toDoEntries;

  if (prevState.appState === 'RECORDING') { recordChange(prevToDoEntries, nextToDoEntries, store); }

  if (prevState.appState === 'RECORDING' && nextState.appState !== 'RECORDING') { saveState(nextState.recordState); }
};

let recordLoadedFromTheState = false;
let recorded = 0;
const loadedState = (store) => (next) => (action) => {
  if (recordLoadedFromTheState === false) {
    const prevState = store.getState();
    recorded = prevState.recordState.size;
    next(action);
    if (recorded === 0) {
      const loadFromStorege = loadState();
      if (loadFromStorege !== null) {
        return store.dispatch(loadRecord(loadFromStorege));
      }
    }
    recordLoadedFromTheState = true;
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
