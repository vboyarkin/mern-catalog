import React from "react";
import DoubleRange from "./DoubleRange";

/**
 *
 * @param {Object} props
 * @param {Object} props.values
 * @param {Number | null} props.values.min
 * @param {Number | null} props.values.max
 */
export default function RangeSelector({
  children,
  limits,
  onRangeChange,
  values,
}) {
  return (
    <div className="range-contaier">
      <h4>{children}</h4>
      <DoubleRange
        onRangeChange={onRangeChange}
        minValue={limits.min}
        maxValue={limits.max}
        values={values}
      />
    </div>
  );
}
