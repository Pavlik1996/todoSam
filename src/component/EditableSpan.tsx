import { ChangeEvent, memo, useState } from "react";

type PropsType = {
  oldTitle: string;
  onChange: (title: string) => void;
};

export const EditableSpan = memo((props: PropsType) => {
  const [title, setTitle] = useState(props.oldTitle);
  const [edit, setEdit] = useState(false);

  const changeTitle = () => {
    props.onChange(title);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDoubleClickHandler = () => {
    setEdit(!edit);
    changeTitle();
  };

  return edit ? (
    <input
      value={title}
      onChange={onChangeHandler}
      onBlur={onDoubleClickHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
  );
});
