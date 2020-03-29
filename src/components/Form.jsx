import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createEntry } from '../store/actions/toDoEntryActions';


function Login(props) {
  const [toDo, setToDo] = useState({});

  const handleChange = (event) => {
    event.persist();
    setToDo(() => ({ ...toDo, [event.target.id]: event.target.value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      dispatch(createEntry({ name: toDo.name, description: toDo.description }));
    }
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
