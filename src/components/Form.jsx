import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEntry, updateEntry } from '../store/actions/toDoEntryActions';

import './Form.scss';

const Form = ( { name, description, id, resetState } ) => {
  const [toDo, setToDo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setToDo(() => ({ ...toDo, name, description }));
  }, [id]);

  const handleChange = (event) => {
    event.persist();
    setToDo(() => ({ ...toDo, [event.target.id]: event.target.value }));
  };

  const handleSubmit = (event) => {
    if (!id) {
      const hash = () => Math.random().toString(36).slice(2);
      event.preventDefault();
      dispatch(createEntry({ name: toDo.name, description: toDo.description, id: hash(), creationDate: new Date()}));
    } else {
      dispatch(updateEntry({ name: toDo.name, description: toDo.description, id }));
      resetState();
    }
    setToDo(() => ({}));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input id="name" placeholder="Enter name" onChange={handleChange} value={toDo.name || ''} required />
        </label>
        <label htmlFor="description">
          Description:
          <textarea id="description" placeholder="Enter description" onChange={handleChange} value={toDo.description || ''} required />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default Form;
