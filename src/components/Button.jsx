import React from 'react';

const Button = ({ name, action, id }) => {
  return (
    <button type="button" onClick={(e) => action(id, e)} className="btn" id={`btn-${name}`}>{name.toUpperCase()}</button>
  );
};

export default Button;
