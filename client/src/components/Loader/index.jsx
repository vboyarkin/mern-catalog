import React from "react";
import TextFiller from "../TextFiller";
import classes from "./Loader.module.sass";

/**
 * @param {Object} props
 * @param {"small" | "medium" | "large"} props.size
 */
export default function Loader({ text = "Загрузка...", size = "small" }) {
  return (
    <div className={classes.loaderContainer}>
      <TextFiller text={text} size={size} />
    </div>
  );
}
