
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Form from './Form';

import './ToDoList.scss';

const ToDoList = ({
  toDoEntries,
  deleteEntry,
  updateEntry,
  appState,
}) => {
  const [update, setUpdate] = useState();

  const resetState = () => {
    setUpdate(() => (null));
  };

  return (
    toDoEntries.map((toDo) => {
      const { name, description, id } = toDo;
      return (update !== id
        ? (
          <div className="list-item" key={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="col-xs-12 col-sm-6">
              <Button
                id={id}
                className="btn"
                name="remove"
                action={deleteEntry}
                dis={(appState !== 'PLAYING')}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Button id={id} className="btn" name="update" action={setUpdate} dis={(appState !== 'PLAYING')} />
            </div>
          </div>
        ) : (
          <Form
            key={id}
            resetState={resetState}
            updateEntry={updateEntry}
            name={name}
            description={description}
            id={id}
          />
        )
      );
    })
  );
};

export default ToDoList;

ToDoList.propTypes = {
  toDoEntries: PropTypes.arrayOf(PropTypes.object),
  deleteEntry: PropTypes.fun,
  updateEntry: PropTypes.fun,
};

ToDoList.defaultProps = {
  toDoEntries: [],
  deleteEntry: null,
  updateEntry: null,
};
