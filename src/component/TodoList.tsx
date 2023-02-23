import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "../state/tasks-reducer";
import { FilterValueType } from "../state/todo-list-reducer";
import { SuperButton } from "./SuperButton";
import { memo, useCallback } from "react";
import { Task } from "./Tasks";

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

export const TodoList = memo((props: PropsType) => {
  const addTaskHandler = useCallback((title: string) => {
    props.addTask(props.todoID, title);
  }, []);

  const removeTaskHandler = useCallback(
    (taskID: string) => {
      props.removeTask(props.todoID, taskID);
    },
    [props.removeTask, props.todoID]
  );

  const changeTaskTitleHandler = useCallback(
    (taskID: string, title: string) => {
      props.changeTaskTitle(props.todoID, taskID, title);
    },
    [props.todoID, props.changeTaskTitle]
  );

  const changeTaskStatusHandler = useCallback(
    (taskID: string, isDone: boolean) => {
      props.changeTaskStatus(props.todoID, taskID, isDone);
    },
    [props.changeTaskStatus, props.todoID]
  );

  const changeTodoTitleHandler = useCallback(
    (title: string) => {
      props.changeTodoTitle(props.todoID, title);
    },
    [props.todoID]
  );

  const changeTodoFilterHandler = (filter: FilterValueType) => {
    props.changeTodoFilter(props.todoID, filter);
  };

  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoID);
  };

  const taskFilter = () => {
    switch (props.filter) {
      case "active": {
        return props.tasks.filter((el) => !el.isDone);
      }
      case "completed": {
        return props.tasks.filter((el) => el.isDone);
      }
      default:
        return props.tasks;
    }
  };

  const filteredTasks = taskFilter();

  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={props.todoTitle}
          onChange={changeTodoTitleHandler}
        />
        <IconButton aria-label="delete" onClick={removeTodoListHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} labelText={"Add New Task"} />
      <ul>
        {filteredTasks.map((el) => (
          <Task
            key={el.id}
            todoID={props.todoID}
            task={el}
            removeTask={removeTaskHandler}
            changeTaskTitle={changeTaskTitleHandler}
            changeTaskStatus={changeTaskStatusHandler}
          />
        ))}
      </ul>
      <SuperButton
        callBack={() => changeTodoFilterHandler("all")}
        name={"all"}
        color={props.filter === "all" ? "secondary" : "success"}
      />
      <SuperButton
        callBack={() => changeTodoFilterHandler("active")}
        name={"active"}
        color={props.filter === "active" ? "secondary" : "success"}
      />
      <SuperButton
        callBack={() => changeTodoFilterHandler("completed")}
        name={"completed"}
        color={props.filter === "completed" ? "secondary" : "success"}
      />
    </div>
  );
});
