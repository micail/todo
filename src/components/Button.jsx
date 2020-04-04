import React from 'react';

const Button = ({ name, toDoAction, id }) => {
  return (
    <button type="button" onClick={(e) => toDoAction(id, e)} className="btn" id={`btn-${name}`}>{name.toUpperCase()}</button>
  );
};

export default Button;
