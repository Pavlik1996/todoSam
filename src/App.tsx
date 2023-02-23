import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AddItemForm } from "./component/AddItemForm";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksStateType,
} from "./state/tasks-reducer";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  FilterValueType,
  removeTodoListAC,
  TodoListType,
} from "./state/todo-list-reducer";
import { TodoList } from "./component/TodoList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useCallback } from "react";

function App() {
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const todoList = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists
  );

  const dispatch = useDispatch();

  const addTask = useCallback(
    (todoID: string, title: string) => {
      dispatch(addTaskAC(todoID, title));
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (todoID: string, taskID: string) => {
      dispatch(removeTaskAC(todoID, taskID));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (todoID: string, taskID: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(todoID, taskID, newTitle));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todoID: string, taskID: string, newIsDone: boolean) => {
      dispatch(changeTaskStatusAC(todoID, taskID, newIsDone));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoTitle = useCallback(
    (todoID: string, newTitle: string) => {
      dispatch(changeTodoListTitleAC(todoID, newTitle));
    },
    [dispatch]
  );

  const changeTodoFilter = useCallback(
    (todoID: string, newFilter: FilterValueType) => {
      dispatch(changeTodoListFilterAC(todoID, newFilter));
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (todoID: string) => {
      dispatch(removeTodoListAC(todoID));
    },
    [dispatch]
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My ToDo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm labelText={"Add new todo list"} callBack={addTodoList} />
        </Grid>
        <Grid container spacing={5}>
          {todoList.map((el) => {
            return (
              <Grid item key={el.id}>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    key={el.id}
                    todoID={el.id}
                    filter={el.filter}
                    tasks={tasks[el.id]}
                    todoTitle={el.title}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoTitle={changeTodoTitle}
                    changeTodoFilter={changeTodoFilter}
                    removeTodoList={removeTodoList}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
export default App;
