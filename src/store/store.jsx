import { createStore, combineReducers, applyMiddleware } from 'redux';

import toDoEntries from './reducers/toDoEntryReducer';
import recordState from './reducers/recordReducer';
import appState from './reducers/appStateReducer';

import record from './actions/recordActions';

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

  const nextToDoEntries = store.getState().toDoEntries;

  if (prevState.appState === 'RECORDING') { recordChange(prevToDoEntries, nextToDoEntries, store); }
};

const applyMid = applyMiddleware(recordMiddleware);

const makeStore = () => createStore(combineReducers(
  {
    toDoEntries,
    recordState,
    appState,
  },
), applyMid);

export default makeStore;
