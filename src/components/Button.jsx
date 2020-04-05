import React from 'react';

const Button = ({ name, action, id, dis }) => {
  return (
    <button type="button" disabled={!dis} onClick={(e) => action(id, e)} className="btn" id={`btn-${name}`}>{name.toUpperCase()}</button>
  );
};

export default Button;
