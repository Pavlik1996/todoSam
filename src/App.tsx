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
import { TodoList } from "./TodoList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

function App() {
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const todoList = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists
  );

  const dispatch = useDispatch();

  const addTask = (todoID: string, title: string) => {
    debugger;
    dispatch(addTaskAC(todoID, title));
  };

  const removeTask = (todoID: string, taskID: string) => {
    dispatch(removeTaskAC(todoID, taskID));
  };

  const changeTaskTitle = (
    todoID: string,
    taskID: string,
    newTitle: string
  ) => {
    dispatch(changeTaskTitleAC(todoID, taskID, newTitle));
  };

  const changeTaskStatus = (
    todoID: string,
    taskID: string,
    newIsDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(todoID, taskID, newIsDone));
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  const changeTodoTitle = (todoID: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoID, newTitle));
  };

  const changeTodoFilter = (todoID: string, newFilter: FilterValueType) => {
    dispatch(changeTodoListFilterAC(todoID, newFilter));
  };

  const removeTodoList = (todoID: string) => {
    dispatch(removeTodoListAC(todoID));
  };

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
            const taskFilter = () => {
              switch (el.filter) {
                case "active": {
                  return tasks[el.id].filter((el) => !el.isDone);
                }
                case "completed": {
                  return tasks[el.id].filter((el) => el.isDone);
                }
                default:
                  return tasks[el.id];
              }
            };

            const filteredTasks = taskFilter();
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    key={el.id}
                    todoID={el.id}
                    filter={el.filter}
                    tasks={filteredTasks}
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
