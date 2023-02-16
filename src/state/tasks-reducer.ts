import { v1 } from "uuid";
import { addTodoListAC, removeTodoListAC } from "./todo-list-reducer";

export type TaskType = { id: string; title: string; isDone: boolean };
export type TasksStateType = {
  [key: string]: TaskType[];
};

const initialState: TasksStateType = {};

export const TaskReducer = (
  state = initialState,
  action: tasksActionsType
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK": {
      const newTask: TaskType = {
        id: action.payload.id,
        title: action.payload.title,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.todoID]: [newTask, ...state[action.payload.todoID]],
      };
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].filter(
          (el) => el.id !== action.payload.taskID
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].map((el) =>
          el.id === action.payload.taskID
            ? { ...el, title: action.payload.newTitle }
            : el
        ),
      };
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].map((el) =>
          el.id === action.payload.taskID
            ? { ...el, isDone: action.payload.newIsDone }
            : el
        ),
      };
    }

    case "ADD-TODO-LIST": {
      return { [action.payload.id]: [], ...state };
    }

    case "REMOVE-TODO-LIST": {
      const copyState = { ...state };
      delete copyState[action.payload.todoID];
      return copyState;
    }

    default:
      return state;
  }
};

type tasksActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>;

export const addTaskAC = (todoID: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: { todoID, id: v1(), title },
  } as const;
};

export const removeTaskAC = (todoID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { todoID, taskID },
  } as const;
};

export const changeTaskTitleAC = (
  todoID: string,
  taskID: string,
  newTitle: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { todoID, taskID, newTitle },
  } as const;
};

export const changeTaskStatusAC = (
  todoID: string,
  taskID: string,
  newIsDone: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { todoID, taskID, newIsDone },
  } as const;
};
