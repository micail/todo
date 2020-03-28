import { createStore, combineReducers } from 'react-redux';

const makeStore = () => createStore(combineReducers({}));

export default makeStore;
