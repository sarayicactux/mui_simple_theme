import React, { forwardRef } from "react";

//import MUI
import TextField from "@mui/material/TextField";

const style = { fontFamily: "dana", fontSize: 14 };

const TextFieldInput = forwardRef((props: any, ref) => {
  // passing the ref to a DOM element,
  // so that the parent has a reference to the DOM node
  return (
    <TextField
      inputProps={{ style }}
      InputLabelProps={{ style }}
      margin="normal"
      fullWidth
      defaultValue={props.defaultValue || ""}
      id={props.name}
      required={props.required}
      label={props.label}
      name={props.name}
      type="text"
      size="small"
      disabled={props.disabled}
      inputRef={ref}
      rows={props.rows}
      multiline={props.multiline}
      onChange={props.onChange}
    />
  );
});
export default TextFieldInput;