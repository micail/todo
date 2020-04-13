import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({
  name,
  action,
  id,
  dis,
}) => {
  const idTag = name.replace(/\s/g, '');
  return (
    <button
      className="btn"
      type="button"
      disabled={!dis}
      onClick={(e) => action(id, e)}
      id={`btn-${idTag}`}>
      {name.toUpperCase()}
    </button>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  action: PropTypes.func,
  dis: PropTypes.bool,
};

Button.defaultProps = {
  name: '',
  id: null,
  action: null,
  dis: false,
};
