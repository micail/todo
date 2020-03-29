
import React from 'react';

const List = ({ toDoEntries }) => toDoEntries.map((toDo) => (
  <div>
    <h1>{toDo.name}</h1>
    <p>{toDo.description}</p>
  </div>
));

export default List;
