
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateEntry, deleteEntry } from '../store/actions/toDoEntryActions';
import { recording, playing, idle } from '../store/actions/appState';

import Form from './Form';
import List from './List';
import Button from './Button';

const App = (props) => {
  const [toDoList, setToDoList] = useState([]);
  const dispatch = useDispatch();

  const deleteToDo = (id) => {
    dispatch(deleteEntry(id));
  };

  const updateToDO = (id) => {
    dispatch(updateEntry({ id }));
  };

  const startRecording = () => {
    dispatch(recording());
  };

  const idleRecord = () => {
    dispatch(idle());
  };

  const playRecord = () => {
    dispatch(playing());
  };

  const renderInDelay = (element, delay) => {
    const interval = setTimeout(() => setToDoList(element), delay);
    return () => clearTimeout(interval);
  };

  useEffect(() => {
    if (props.appState === 'PLAYING' && props.recordState) {
      const recorded = props.recordState.toJS();
      setToDoList([]);
      recorded.map((r, i) => {
        const delay = i * 2000;
        return renderInDelay(r, delay);
      });
      idleRecord();
    } else {
      setToDoList(props.toDoEntries);
    }
  }, [props]);

  return (
    <div>
      <Form />
      <List toDoEntries={toDoList} updateEntry={updateToDO} deleteEntry={deleteToDo} />
      <Button name="record" action={startRecording} />
      <Button name="play" action={playRecord} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries.toJS(),
    recordState: state.recordState,
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(App);
