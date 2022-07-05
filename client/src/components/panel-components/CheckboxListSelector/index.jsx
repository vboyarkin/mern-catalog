import classes from "./CheckboxListSelector.module.sass";
import TextField from "../TextField";

import React, { useState } from "react";

/**
 * @param {Object} props
 * @param {Object[]} props.options
 * @param {Number} props.options.id
 * @param {String} props.options.option
 * @param {Boolean[]} props.checkedOptions
 * @param {Boolean} props.addTextField
//  */
export default function CheckboxListSelector({
  children,
  options,
  checkedOptions,
  addTextField,
  onSelectionChange,
}) {
  if (!options) console.error("Prop 'options' is required!");
  if (!checkedOptions) console.error("Prop 'checkedOptions' is required!");
  if (!onSelectionChange)
    console.error("Prop 'onSelectionChange' is required!");

  const [textFilter, setTextFilter] = useState("");

  const filteredItems = () => {
    return options.filter((x) =>
      x.option.toLowerCase().includes(textFilter.toLowerCase().trim())
    );
  };

  function onTextFieldValueChange(e) {
    setTextFilter(e.target.value);
  }

  function checkItem(i) {
    const newCheckedOptions = checkedOptions.slice(0, checkedOptions.length);
    newCheckedOptions[i] = !newCheckedOptions[i];

    onSelectionChange(newCheckedOptions);
  }

  return (
    <div className={classes.checkboxContaier}>
      <h4>{children}</h4>

      {addTextField ? <TextField onValueChange={onTextFieldValueChange} /> : ""}

      {filteredItems().map((item, i) => (
        <div className="list-wrap" key={item.id}>
          <input
            type="checkbox"
            id={"checkbox" + item.id}
            value={checkedOptions[i]}
            checked={checkedOptions[i]}
            onChange={(e) => checkItem(i)}
          />
          <label htmlFor={"checkbox" + item.id}>{item.option}</label>
        </div>
      ))}
    </div>
  );
}
