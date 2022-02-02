import React from 'react';
import { useEffect } from 'react/cjs/react.production.min';

const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  START_EDIT_TODO: 'START_EDIT_TODO',
  END_EDIT_TODO: 'END_EDIT_TODO',
  DELETE_TODO: 'DELETE_TODO',
  COMPLETE_TODO: 'COMPLETE_TODO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ACTIONS.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload) return todo;
          return { ...todo, isDone: !todo.isDone };
        }),
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          console.log(
            ACTIONS.DELETE_TODO,
            todo.id,
            action.payload,
            todo.id !== action.payload
          );
          return todo.id !== action.payload;
        }),
      };

    case ACTIONS.START_EDIT_TODO:
      return {
        ...state,
        editMode: true,
        todoForm: state.todos.filter((todo) => todo.id === action.payload)[0],
      };

    case ACTIONS.END_EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return action.payload;
        }),
        editMode: false,
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    todos: [],
    todoForm: { name: '', isDone: false, id: null },
    editMode: false,
  });

  const [name, setName] = React.useState(state.todoForm.name);
  const [isDone, setIsDone] = React.useState(state.todoForm.isDone);
  const focusInputOnEdit = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.editMode) {
      dispatch({
        type: ACTIONS.END_EDIT_TODO,
        payload: { name, id: state.todoForm.id, isDone },
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: { name, id: Date.now(), isDone },
      });
    }
    setName('');
    setIsDone(false);
  };

  React.useEffect(() => {
    setIsDone(state.todoForm.isDone);
    setName(state.todoForm.name);
    focusInputOnEdit.current.focus();
  }, [state.todoForm.name, state.todoForm.isDone]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoName">Todo</label>
        <input
          ref={focusInputOnEdit}
          id="todoName"
          name="todoName"
          type="text"
          value={name}
          autoFocus={state.editMode}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="isDone">Done?</label>
        <input
          id="isDone"
          name="isDone"
          type="checkbox"
          value={isDone}
          onChange={(e) => setIsDone(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          ↪
        </button>
      </form>

      <ul>
        {console.log(state)}
        {state.todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{ color: todo.isDone ? 'grey' : 'firebrick' }}
            >
              {todo.name}
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: ACTIONS.COMPLETE_TODO,
                    payload: todo.id,
                  })
                }
              >
                ✅
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: ACTIONS.START_EDIT_TODO,
                    payload: todo.id,
                  })
                }
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: ACTIONS.DELETE_TODO,
                    payload: todo.id,
                  })
                }
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
