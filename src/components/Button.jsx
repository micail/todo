import React from 'react';

import './Button.scss';

const Button = ({ name, action, id, dis }) => {
  const idTag = name.replace(/\s/g, '');
  return (
    <button className="btn" type="button" disabled={!dis} onClick={(e) => action(id, e)} id={`btn-${idTag}`}>{name.toUpperCase()}</button>
  );
};

export default Button;
