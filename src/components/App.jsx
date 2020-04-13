
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createEntry, updateEntry, deleteEntry, clearEntries } from '../store/actions/toDoEntryActions';
import { recording, playing, idle } from '../store/actions/appState';

import { clearRecord } from '../store/actions/recordActions';

import Form from './Form';
import ToDoList from './ToDoList';
import Button from './Button';

import './App.scss';

const App = ({ toDoEntries, record, appState }) => {
  const [toDoList, setToDoList] = useState([]);
  const dispatch = useDispatch();

  const toDoData = toDoEntries;
  const recordData = record;

  // TODO actions
  const addEntry = (entry) => {
    const hash = () => Math.random().toString(36).slice(2);
    dispatch(createEntry(
      {
        name: entry.name,
        description: entry.description,
        id: hash(),
        creationDate: new Date(),
      },
    ));
  };

  const deleteToDo = (id) => {
    dispatch(deleteEntry(id));
  };

  const updateToDO = (entry) => {
    dispatch(updateEntry(entry));
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
    if (appState !== 'PLAYING' && record.length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    // On play record clear TODO list store and
    if (appState === 'PLAYING' && record.length > 0) {
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
          <Form addEntry={addEntry} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <ToDoList toDoEntries={toDoList} updateEntry={updateToDO} deleteEntry={deleteToDo} />
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
            <Button name="Clear Recording" action={clearRecording} dis={(appState !== 'RECORDING' && record.length > 0)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries.toJS(),
    record: state.recordState.toJS(),
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(App);

App.propTypes = {
  toDoEntries: PropTypes.arrayOf(PropTypes.object),
  record: PropTypes.arrayOf(PropTypes.array),
  appState: PropTypes.string,
};

App.defaultProps = {
  toDoEntries: [],
  record: [],
  appState: '',
};
