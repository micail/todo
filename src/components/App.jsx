
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateEntry, deleteEntry } from '../store/actions/toDoEntryActions';
import { recording, playing, idle } from '../store/actions/appState';

import { clearRecord } from '../store/actions/recordActions';

import Form from './Form';
import List from './List';
import Button from './Button';

import './App.scss';

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

  const stopRecording = () => {
    dispatch(idle());
  };

  const playRecording = () => {
    dispatch(playing());
  };

  const clearRecording = () => {
    dispatch(clearRecord());
  };

  const renderInDelay = (element, delay) => {
    const interval = setTimeout(() => setToDoList(element), delay);
    return () => clearTimeout(interval);
  };

  const shouldEnablePlayButton = () => {
    if (props.appState != 'PLAYING' && props.recordState.size > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.appState === 'PLAYING' && props.recordState.size > 0) {
      const recorded = props.recordState.toJS();
      setToDoList([]);
      recorded.map((r, i) => {
        const delay = i * 2000;
        return renderInDelay(r, delay);
      });
      stopRecording();
    } else {
      setToDoList(props.toDoEntries);
    }
  }, [props]);

  return (
    <div className="container">

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Form />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <List toDoEntries={toDoList} updateEntry={updateToDO} deleteEntry={deleteToDo} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Button name="Record" action={startRecording} dis={(props.appState !== 'RECORDING')} />
          <Button name="Stop Recording" action={stopRecording} dis={(props.appState == 'RECORDING')} />
          <Button name="Play Recording" action={playRecording} dis={shouldEnablePlayButton()} />
          <Button name="Clear Recording" action={clearRecording} dis={(props.appState !== 'RECORDING' && props.recordState.size > 0)} />
        </div>
      </div>
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
