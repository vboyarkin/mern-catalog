import React from "react";
import classes from "./RadioListSelector.module.sass";

export default function RadioListSelector({
  children,
  items,
  onChange,
  value,
}) {
  return (
    <div className={classes.radioContaier}>
      <h4>{children}</h4>
      {items.map((item) => (
        <div className="list-wrap" key={item.id}>
          <input
            type="radio"
            value={item.option}
            checked={value !== null && item.option === Number(value)}
            id={"radio" + item.id}
            name={children}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={"radio" + item.id}>{item.option}</label>
        </div>
      ))}
    </div>
  );
}
