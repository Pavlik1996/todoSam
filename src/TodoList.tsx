import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { AddItemForm } from "./component/AddItemForm";
import { EditableSpan } from "./component/EditableSpan";
import { TaskType } from "./state/tasks-reducer";
import { FilterValueType } from "./state/todo-list-reducer";
import { SuperButton } from "./component/SuperButton";
import { CheckBox } from "@mui/icons-material";

type PropsType = {
  todoID: string;
  filter: FilterValueType;
  tasks: TaskType[];
  todoTitle: string;
  addTask: (todoID: string, title: string) => void;
  removeTask: (todoID: string, taskID: string) => void;
  changeTaskTitle: (todoID: string, taskID: string, newTitle: string) => void;
  changeTaskStatus: (
    todoID: string,
    taskID: string,
    newIsDone: boolean
  ) => void;
  changeTodoTitle: (todoID: string, newTitle: string) => void;
  changeTodoFilter: (todoID: string, newFilter: FilterValueType) => void;
  removeTodoList: (todoID: string) => void;
};

export const TodoList = (props: PropsType) => {
  const addTaskHandler = (title: string) => {
    props.addTask(props.todoID, title);
  };

  const removeTaskHandler = (taskID: string) => {
    props.removeTask(props.todoID, taskID);
  };

  const changeTaskTitleHandler = (taskID: string, title: string) => {
    props.changeTaskTitle(props.todoID, taskID, title);
  };

  const changeTaskStatusHandler = (taskID: string, isDone: boolean) => {
    props.changeTaskStatus(props.todoID, taskID, isDone);
  };

  const changeTodoTitleHandler = (title: string) => {
    props.changeTodoTitle(props.todoID, title);
  };

  const changeTodoFilterHandler = (filter: FilterValueType) => {
    props.changeTodoFilter(props.todoID, filter);
  };

  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoID);
  };

  const tasks = props.tasks.length ? (
    props.tasks.map((el) => {
      return (
        <li key={el.id}>
          <Checkbox
            checked={el.isDone}
            onChange={(e) =>
              changeTaskStatusHandler(el.id, e.currentTarget.checked)
            }
          />
          <EditableSpan
            oldTitle={el.title}
            callBack={(title) => changeTaskTitleHandler(el.id, title)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => removeTaskHandler(el.id)}
          >
            <DeleteIcon />
          </IconButton>
        </li>
      );
    })
  ) : (
    <span>Task List is empty</span>
  );
  return (
    <>
      <h3>
        <EditableSpan
          oldTitle={props.todoTitle}
          callBack={changeTodoTitleHandler}
        />
        <IconButton aria-label="delete" onClick={removeTodoListHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} labelText={"Add New Task"} />
      <ul>{tasks}</ul>
      <SuperButton
        callBack={() => changeTodoFilterHandler("all")}
        name={"all"}
      />
      <SuperButton
        callBack={() => changeTodoFilterHandler("active")}
        name={"active"}
      />
      <SuperButton
        callBack={() => changeTodoFilterHandler("completed")}
        name={"completed"}
      />
    </>
  );
};
