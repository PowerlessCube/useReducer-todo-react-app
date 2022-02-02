import React from 'react';

import ACTIONS from './constants';

const TodoForm = ({ dispatch, todoForm, editMode }) => {
  const [todoName, setTodoName] = React.useState(todoForm.name);
  const [isTodoDone, setIsTodoDone] = React.useState(todoForm.isDone);
  const focusInputOnEdit = React.useRef();

  React.useEffect(() => {
    setIsTodoDone(todoForm.isDone);
    setTodoName(todoForm.name);
    focusInputOnEdit.current.focus();
  }, [todoForm.isDone, todoForm.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoName) return;
    if (editMode) {
      dispatch({
        type: ACTIONS.END_EDIT_TODO,
        payload: { name: todoName, id: todoForm.id, isDone: isTodoDone },
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: { name: todoName, id: Date.now(), isDone: isTodoDone },
      });
    }
    setTodoName('');
    setIsTodoDone(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {console.log('todoForm: ', { todoForm })}
      <label htmlFor="todoName">Todo</label>
      <input
        ref={focusInputOnEdit}
        id="todoName"
        name="todoName"
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      ></input>
      <label htmlFor="isTodoDone">Done?</label>
      <input
        id="isTodoDone"
        name="isTodoDone"
        type="checkbox"
        checked={isTodoDone}
        onChange={(e) => {
          console.log('todoForm, Checkbox: ', e);
          setIsTodoDone(e.target.checked);
        }}
      />
      <button type="button" onClick={handleSubmit}>
        ↪
      </button>
    </form>
  );
};

export default TodoForm;
