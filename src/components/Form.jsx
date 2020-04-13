import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Form.scss';

const Form = ({
  name,
  description,
  id,
  resetState,
  addEntry,
  updateEntry,
}) => {
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
      resetState();
    } else {
      updateEntry({ name: toDo.name, description: toDo.description, id });
      resetState();
    }
    setToDo(() => ({}));
  };

  return (
    <div className="form-wrapper">
      <form id={id ? 'form-update' : 'form-create'} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input id="name" name="name" placeholder="Enter name" onChange={handleChange} value={toDo.name || ''} required />
        </label>
        <label htmlFor="description">
          Description:
          <textarea id="description" name="description" placeholder="Enter description" onChange={handleChange} value={toDo.description || ''} required />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default Form;

Form.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  resetState: PropTypes.func,
  addEntry: PropTypes.func,
  updateEntry: PropTypes.func,
};

Form.defaultProps = {
  name: '',
  description: '',
  id: null,
  resetState: null,
  addEntry: null,
  updateEntry: null,
};
