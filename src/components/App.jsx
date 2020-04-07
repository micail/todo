
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateEntry, deleteEntry, clearEntries } from '../store/actions/toDoEntryActions';
import { recording, playing, idle } from '../store/actions/appState';

import { clearRecord } from '../store/actions/recordActions';

import Form from './Form';
import List from './List';
import Button from './Button';

import './App.scss';

const App = ({ toDoEntries, record, appState }) => {
  const [toDoList, setToDoList] = useState([]);
  const dispatch = useDispatch();

  const toDoData = toDoEntries.toJS();
  const recordData = record.toJS();

  // TODO actions
  const deleteToDo = (id) => {
    dispatch(deleteEntry(id));
  };

  const updateToDO = (id) => {
    dispatch(updateEntry({ id }));
  };

  // Record actions
  const startRecording = () => {
    dispatch(recording());
  };

  const stopRecording = () => {
    dispatch(idle());
  };

  const playRecording = () => {
    stopRecording();
    dispatch(clearEntries());
    dispatch(playing());
  };

  const clearRecording = () => {
    dispatch(clearRecord());
  };

  // Render record in delay
  const renderInDelay = (element, delay) => {
    const interval = setTimeout(() => setToDoList(element), delay);
    return () => clearTimeout(interval);
  };

  // Enable play record button
  const shouldEnablePlayButton = () => {
    if (appState !== 'PLAYING' && record.size > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (appState === '') { stopRecording(); }

    // On play record clear TODO list store and 
    if (appState === 'PLAYING' && record.size > 0) {
      setToDoList([]);
      recordData.map((r, i) => {
        const delay = i * 1000;
        return renderInDelay(r, delay);
      });
      stopRecording();
    } else {
      setToDoList(toDoData);
    }
  }, [toDoEntries, record, appState]);

  return (
    <div className="container">

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Form />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <List toDoEntries={toDoList} updateEntry={updateToDO} deleteEntry={deleteToDo} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6 padding-none">
          <div className="col-xs-12 col-md-6 col-lg-3">
            <Button name="Record" action={startRecording} dis={(appState !== 'RECORDING')} />
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <Button name="Stop Recording" action={stopRecording} dis={(appState === 'RECORDING')} />
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <Button name="Play Recording" action={playRecording} dis={shouldEnablePlayButton()} />
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <Button name="Clear Recording" action={clearRecording} dis={(appState !== 'RECORDING' && record.size > 0)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries,
    record: state.recordState,
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(App);
