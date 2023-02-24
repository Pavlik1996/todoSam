import { action } from "@storybook/addon-actions";
import { Task } from "./Tasks";

export default {
  title: "Task Component",
  component: Task,
};

const removeTask = action("remove");
const changeTaskTitle = action("change Task Title");
const changeTaskStatus = action("change Task Status");

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        todoID={"todolistid1"}
        task={{ id: "1", title: "CSS", isDone: false }}
        removeTask={removeTask}
        changeTaskTitle={changeTaskTitle}
        changeTaskStatus={changeTaskStatus}
      />
      <Task
        todoID={"todolistid2"}
        task={{ id: "2", title: "JS", isDone: true }}
        removeTask={removeTask}
        changeTaskTitle={changeTaskTitle}
        changeTaskStatus={changeTaskStatus}
      />
    </>
  );
};
