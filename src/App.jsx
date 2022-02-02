import React from 'react';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { todoReducer, initialState } from './todoReducer';

const App = () => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);
  return (
    <>
      {console.log(state)}
      <TodoForm
        dispatch={dispatch}
        todoForm={state.todoForm}
        editMode={state.editMode}
      />
      <TodoList todos={state.todos} dispatch={dispatch} />
    </>
  );
};

export default App;
