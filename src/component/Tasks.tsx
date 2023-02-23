import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../state/tasks-reducer";
import { memo, useCallback } from "react";

type PropsType = {
  todoID: string;
  task: TaskType;
  removeTask: (taskID: string) => void;
  changeTaskTitle: (taskID: string, newTitle: string) => void;
  changeTaskStatus: (taskID: string, newIsDone: boolean) => void;
};

export const Task = memo((props: PropsType) => {
  const removeTaskHandler = (taskID: string) => props.removeTask(taskID);

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      props.changeTaskTitle(props.task.id, title);
    },
    [props.todoID, props.changeTaskTitle]
  );

  const changeTaskStatusHandler = (taskID: string, isDone: boolean) =>
    props.changeTaskStatus(taskID, isDone);

  return (
    <li>
      <Checkbox
        checked={props.task.isDone}
        onChange={(e) =>
          changeTaskStatusHandler(props.task.id, e.currentTarget.checked)
        }
      />
      <EditableSpan
        oldTitle={props.task.title}
        onChange={changeTaskTitleHandler}
      />
      <IconButton
        aria-label="delete"
        onClick={() => removeTaskHandler(props.task.id)}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
