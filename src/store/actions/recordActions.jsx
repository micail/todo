import { RECORD, CLEAR_RECORD } from '../types/recordType';

export const record = (toDoS) => ({ type: RECORD, toDoS });
export const clearRecord = () => ({ type: CLEAR_RECORD });
