import { List, Map } from 'immutable';

const toDoEntry = {
  id: 1,
  name: 'First TODO name',
  description: 'First TODO description',
  date: 'Sat Mar 28 2020 18:42:22 GMT+0000 (Greenwich Mean Time)',
};

const toDoEntry2 = {
  id: 2,
  name: 'Second TODO name',
  description: 'Second TODO description',
  date: 'Sat Mar 29 2020 18:42:22 GMT+0000 (Greenwich Mean Time)',
};

export default toDoEntry;

const entries = Map(toDoEntry, toDoEntry2);

export const record = List(entries);
