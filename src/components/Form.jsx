import React, { useEffect, useState } from 'react';

import './Form.scss';

const Form = ({ name, description, id, resetState, addEntry, updateEntry }) => {
  const [toDo, setToDo] = useState({});

  useEffect(() => {
    setToDo(() => ({ ...toDo, name, description }));
  }, [id]);

  const handleChange = (event) => {
    event.persist();
    setToDo(() => ({ ...toDo, [event.target.id]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id) {
      addEntry({ name: toDo.name, description: toDo.description });
    } else {
      updateEntry({ name: toDo.name, description: toDo.description, id });
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
