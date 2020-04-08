import { RECORD, CLEAR_RECORD, LOAD_RECORD } from '../types/recordTypes';

export const record = (toDoS) => ({ type: RECORD, toDoS });
export const loadRecord = (recorded) => ({ type: LOAD_RECORD, recorded });
export const clearRecord = () => ({ type: CLEAR_RECORD });
