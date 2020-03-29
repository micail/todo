import { createStore, combineReducers } from 'redux';
import toDoEntryReducer from './reducers/toDoEntryReducer';

const makeStore = () => createStore(combineReducers(toDoEntryReducer));

export default makeStore;
