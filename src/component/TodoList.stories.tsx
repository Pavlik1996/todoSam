import { action } from "@storybook/addon-actions";
import { TodoList } from "./TodoList";

export default {
  title: "Todo List Component",
  component: TodoList,
};

const addTask = action("add Task");
const changeTaskStatus = action("change Task Status");
const changeTaskTitle = action("change Task Title");
const changeTodoFilter = action("change Todo Filter");
const changeTodoTitle = action("change Todo Title");
const removeTask = action("remove Task");
const removeTodoList = action("remove Todo List");

export const EditableSpanExample = () => {
  return (
    <>
      <TodoList
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        changeTodoFilter={changeTodoFilter}
        changeTodoTitle={changeTodoTitle}
        filter={"all"}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        tasks={[{ id: "1", isDone: false, title: "title" }]}
        todoID={"todoID"}
        todoTitle={"todoTitle"}
      />
    </>
  );
};
