import React from "react";
import { createUseStyles } from "react-jss";

export default function PercentOfChangeIcon({
  isIncrease,
}: {
  isIncrease: boolean;
}) {
  const classes = styles();

  return (
    <div
      className={`${classes.triangle} ${
        isIncrease ? classes.triangle_increase : classes.triangle_decrease
      }`}
    ></div>
  );
}

const styles = createUseStyles({
  triangle: {
    position: "absolute",
    left: "12%",

    width: "0 !important",
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
  },
  triangle_increase: {
    borderBottom: "21px solid #2fd617;",
  },

  triangle_decrease: {
    borderTop: "21px solid #f95959;",
  },
});
