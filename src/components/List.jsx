
import React, { useState } from 'react';
import Button from './Button';
import Form from './Form';

const List = ({ toDoEntries, deleteEntry, updateEntry }) => {
  const [update, setUpdate] = useState();

  const resetState = () => {
    setUpdate(() => (null));
  };

  return (
    toDoEntries.map((toDo) => {
      const { name, description, id } = toDo;
      return (update !== id
        ? (
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <Button name="delete" action={deleteEntry} id={id} dis />
            <button name="update" type="button" onClick={() => (setUpdate(id))}>UPDATE</button>
          </div>
        ) : (<Form resetState={resetState} updateEntry={updateEntry} name={name} description={description} id={id} />)
      );
    })
  );
};

export default List;
