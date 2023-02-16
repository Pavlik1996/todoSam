import { v1 } from "uuid";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  FilterValueType,
  removeTodoListAC,
  TodoListReducer,
  TodoListType,
} from "./todo-list-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test.skip("correct todolist should be removed", () => {
  const endState = TodoListReducer(startState, removeTodoListAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test.skip("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";

  const endState = TodoListReducer(startState, addTodoListAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe("all");
});

test.skip("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const action = changeTodoListTitleAC(todolistId2, newTodolistTitle);

  const endState = TodoListReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test.skip("correct filter of todolist should be changed", () => {
  let newFilter: FilterValueType = "completed";

  const action = changeTodoListFilterAC(todolistId2, newFilter);

  const endState = TodoListReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
