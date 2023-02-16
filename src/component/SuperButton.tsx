import Button from "@mui/material/Button";
import { memo } from "react";

type SuperButtonType = {
  callBack: () => void;
  name: string;
  color:
    | "error"
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
};

export const SuperButton = memo((props: SuperButtonType) => (
  <Button variant="contained" color={props.color} onClick={props.callBack}>
    {props.name}
  </Button>
));
