
import React, { useState } from 'react';
import Button from './Button';
import Form from './Form';

import './List.scss';

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
          <div className="list-item">
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="col-xs-6 col-md-2 padding-none">
            <Button className="btn" name="remove" action={deleteEntry} id={id} dis />
            </div>
            <div className="col-xs-6 col-md-2 padding-none">
            <button className="btn" name="update" type="button" onClick={() => (setUpdate(id))}>UPDATE</button>
            </div>
          </div>
        ) : (<Form resetState={resetState} updateEntry={updateEntry} name={name} description={description} id={id} />)
      );
    })
  );
};

export default List;
