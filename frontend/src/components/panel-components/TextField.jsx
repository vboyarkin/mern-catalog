import React from "react";
import classes from "./TextField.module.sass";

export default function TextField({ onClick, placeholder, onValueChange }) {
  return (
    <div className={classes.textField}>
      <input type="text" placeholder={placeholder} onChange={onValueChange} />
      <button onClick={onClick}>&#x2715;</button>
    </div>
  );
}
