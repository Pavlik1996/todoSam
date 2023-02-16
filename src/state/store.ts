import { combineReducers, legacy_createStore } from "redux";
import { TaskReducer } from "./tasks-reducer";
import { TodoListReducer } from "./todo-list-reducer";

const rootReduce = combineReducers({
  todoLists: TodoListReducer,
  tasks: TaskReducer,
});

export const store = legacy_createStore(rootReduce);

export type AppRootStateType = ReturnType<typeof rootReduce>;

//@ts-ignore
window.store = store;
