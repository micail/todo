
import React from 'react';
import { connect } from 'react-redux';

export const App = () => {
  return (
    <div>
      <h1>Helo world !</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries,
  };
};

export default connect(mapStateToProps)(App);
