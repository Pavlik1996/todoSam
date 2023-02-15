import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

const initialState: TodoListType[] = [];

export const TodoListReducer = (
  state = initialState,
  action: todoListActionsType
): TodoListType[] => {
  switch (action.type) {
    case "ADD-TODO-LIST": {
      const newTodo: TodoListType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      };
      return [...state, newTodo];
    }
    case "CHANGE-TODO-LIST-TITLE": {
      return state.map((el) =>
        el.id === action.payload.todoID
          ? { ...el, title: action.payload.newTitle }
          : el
      );
    }
    case "CHANGE-TODO-LIST-FILTER": {
      return state.map((el) =>
        el.id === action.payload.todoID
          ? { ...el, filter: action.payload.newFilter }
          : el
      );
    }
    case "REMOVE-TODO-LIST": {
      return state.filter((el) => el.id !== action.payload.todoID);
    }
    default:
      return state;
  }
};

type todoListActionsType =
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof removeTodoListAC>;

export const addTodoListAC = (title: string) => {
  return {
    type: "ADD-TODO-LIST",
    payload: { title, id: v1() },
  } as const;
};

export const changeTodoListTitleAC = (todoID: string, newTitle: string) => {
  return {
    type: "CHANGE-TODO-LIST-TITLE",
    payload: { todoID, newTitle },
  } as const;
};

export const changeTodoListFilterAC = (
  todoID: string,
  newFilter: FilterValueType
) => {
  return {
    type: "CHANGE-TODO-LIST-FILTER",
    payload: { todoID, newFilter },
  } as const;
};

export const removeTodoListAC = (todoID: string) => {
  return {
    type: "REMOVE-TODO-LIST",
    payload: { todoID },
  } as const;
};
