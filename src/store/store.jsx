import { createStore, combineReducers } from 'redux';
import toDoEntryReducer from './reducers/toDoEntryReducer';

const makeStore = () => createStore(combineReducers({ toDoEntries: toDoEntryReducer }));

export default makeStore;
