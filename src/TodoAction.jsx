import React from 'react';

const TodoAction = ({ children, dispatch }) => {
  return (
    <button type="button" onClick={dispatch}>
      {children}
    </button>
  );
};

export default TodoAction;
