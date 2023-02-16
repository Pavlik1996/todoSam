import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
  labelText: string;
  callBack: (title: string) => void;
};

export const AddItemForm = memo((props: PropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onClickHandler = () => {
    if (title.trim() !== "") {
      props.callBack(title);
      setTitle("");
    } else {
      setError("Enter title");
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    error && setError(null);
    e.key === "Enter" && onClickHandler();
  };

  const styleButton = {
    marginLeft: "5px",
    maxHeight: "45px",
    minHeight: "45px",
    maxWidth: "45px",
    minWidth: "45px",
  };

  return (
    <>
      <TextField
        error={!!error}
        value={title}
        id="standard-basic"
        label={!error ? props.labelText : error}
        variant="standard"
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        size={"small"}
      />
      <Button
        variant="contained"
        onClick={onClickHandler}
        style={styleButton}
        size={"small"}
      >
        +
      </Button>
    </>
  );
});
