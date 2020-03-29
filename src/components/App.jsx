
import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import List from './List';

const App = (props) => {

  const { toDoEntries } = props;

  return (
    <div>
      <Form />
      <List toDoEntries={toDoEntries} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toDoEntries: state.toDoEntries.toJS(),
  };
};

export default connect(mapStateToProps)(App);
