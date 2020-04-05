
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateEntry, deleteEntry } from '../store/actions/toDoEntryActions';

import Form from './Form';
import List from './List';

const App = (props) => {

  useEffect(() => {
    console.log('asdfasdfasdfasdfasdf', props);
  },[props]);

  const { toDoEntries } = props;

  const dispatch = useDispatch();

  const deleteToDo = (id) => {
    dispatch(deleteEntry(id));
  };

  const updateToDO = (id) => {
    dispatch(updateEntry({ id }));
  };

  return (
    <div>
      <Form />
      <List toDoEntries={toDoEntries} updateEntry={updateToDO} deleteEntry={deleteToDo} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries.toJS(),
  };
};

export default connect(mapStateToProps)(App);
