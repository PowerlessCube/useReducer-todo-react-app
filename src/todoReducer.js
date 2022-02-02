import ACTIONS from './constants';

const initialState = {
  todos: [],
  todoForm: { name: '', isDone: false, id: null },
  editMode: false,
};

const todoReducer = (state, action) => {
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
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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

export { todoReducer, initialState };
