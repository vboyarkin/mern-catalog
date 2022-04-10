import React, { useEffect } from "react";
import classes from "./TextFiller.module.sass";

/**
 * @param {Object} props
 * @param {"small" | "medium" | "large"} props.size
 */
export default function Loader({ text = "", size = "small" }) {
  useEffect(() => {
    if (!["small", "medium", "large"].includes(size))
      console.warn("Text filller should be 'small' | 'medium' | 'large'");
  }, [size]);

  return (
    <div className={classes.textFiller + " " + classes[size]}>
      <h4>{text}</h4>
    </div>
  );
}

