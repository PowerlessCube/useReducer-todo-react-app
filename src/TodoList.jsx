import ACTIONS from './constants';
import TodoAction from './TodoAction';
import React from 'react';

const TodoList = ({ todos, dispatch }) => {
  return (
    <ul>
      {console.log('TodoList: ', todos)}
      {todos.map((todo) => {
        return (
          <li
            key={todo.id}
            style={{ color: todo.isDone ? 'grey' : 'firebrick' }}
          >
            {todo.name}
            <TodoAction
              dispatch={() =>
                dispatch({
                  type: ACTIONS.COMPLETE_TODO,
                  payload: todo.id,
                })
              }
            >
              ✅
            </TodoAction>
            <TodoAction
              dispatch={() =>
                dispatch({
                  type: ACTIONS.START_EDIT_TODO,
                  payload: todo.id,
                })
              }
            >
              ✏️
            </TodoAction>
            <TodoAction
              dispatch={() =>
                dispatch({
                  type: ACTIONS.DELETE_TODO,
                  payload: todo.id,
                })
              }
            >
              ❌
            </TodoAction>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
