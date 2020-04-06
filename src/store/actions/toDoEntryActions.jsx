import * as types from '../types/toDoTypes';

export const createEntry = (entry) => ({ type: types.CREATE_TODO_ENTRY, entry });
export const updateEntry = (entry) => ({ type: types.UPDATE_TODO_ENTRY, entry });
export const deleteEntry = (id) => ({ type: types.DELETE_TODO_ENTRY, id });
export const clearEntries = () => ({ type: types.CLEAR_ENTRIES });
