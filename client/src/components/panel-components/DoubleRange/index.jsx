import React, { useEffect } from "react";
import classes from "./DoubleRange.module.sass";

export default function DoubleRange({
  minValue,
  maxValue,
  onRangeChange,
  values,
}) {
  const getValues = () => {
    let { min, max } = values;
    if (min === null) min = minValue;
    if (max === null) max = maxValue;

    return { min, max };
  };

  const sanitizeNumber = (val, isHarsh = false) => {
    const newVal = Math.round(Number(val) * 100) / 100;

    if (isHarsh && newVal < 0) return 0;
    else if (isHarsh && newVal > maxValue) return maxValue;
    else if (isHarsh && newVal < minValue) return minValue;
    else return newVal;
  };

  useEffect(() => {
    updateHighlightedInterval(getValues().min, getValues().max);
  }, [values]);

  const onValueChange = (e, isChangedBySlider, isLeftChange) => {
    const newVal = sanitizeNumber(e.target.value);

    let left = values.min || minValue;
    let right = values.max || maxValue;

    if (isLeftChange) {
      left = newVal;

      if (newVal > right) {
        if (isChangedBySlider) left = right;
        right = newVal;
      }
    } else {
      right = newVal;

      if (newVal < left) {
        if (isChangedBySlider) right = left;
        left = newVal;
      }
    }

    onRangeChange({ min: left, max: right });
  };

  const onInputFocusOut = (e) => {
    e.target.value = sanitizeNumber(e.target.value, true);
  };

  const updateHighlightedInterval = (leftValue, rightValue) => {
    for (const [variable, value] of cssVars(leftValue, rightValue)) {
      document.documentElement.style.setProperty(variable, value);
    }
  };

  const cssVars = (leftValue, rightValue) => {
    const left = sanitizeNumber(leftValue, true);
    const right = sanitizeNumber(rightValue, true);

    return [
      [
        "--active-interval-offset",
        Math.abs((100 * (left - minValue)) / (maxValue - minValue)) + "%",
      ],
      [
        "--interval-width",
        Math.abs((100 * (right - left)) / (maxValue - minValue)) + "%",
      ],
    ];
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.textContainer}>
        <input
          type="number"
          placeholder={minValue}
          value={getValues().min}
          onChange={(e) => onValueChange(e, false, true)}
          onBlur={onInputFocusOut}
        />
        <span className={classes.dash}>—</span>
        <input
          type="number"
          placeholder={maxValue}
          value={getValues().max}
          onChange={(e) => onValueChange(e, false, false)}
          onBlur={onInputFocusOut}
        />
      </div>

      <div className={classes.flexCntainer}>
        <div className={classes.rangeContainer}>
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={getValues().min}
            onChange={(e) => onValueChange(e, true, true)}
          />
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={getValues().max}
            onChange={(e) => onValueChange(e, true, false)}
          />
        </div>
      </div>
    </div>
  );
}
