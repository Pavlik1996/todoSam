import {
  addTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskReducer,
  TasksStateType,
} from "./tasks-reducer";
import { addTodoListAC, removeTodoListAC } from "./todo-list-reducer";

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
});

test.skip("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("todolistId2", "2");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((el) => el.id !== "2")).toBeTruthy();
});

test.skip("correct task should be added to correct array", () => {
  const action = addTaskAC("todolistId1", "newTitle");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"][0].id).toBeDefined();
  expect(endState["todolistId1"][0].title).toBe("newTitle");
  expect(endState["todolistId1"][0].isDone).toBe(false);
});

test.skip("title of specified task should be changed", () => {
  const action = changeTaskTitleAC("todolistId2", "2", "yogurt");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});

test.skip("new array should be added when new todolist is added", () => {
  const action = addTodoListAC("new todolist");

  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test.skip("propertry with todolistId should be deleted", () => {
  const action = removeTodoListAC("todolistId2");

  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
