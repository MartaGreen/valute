import React from "react";
import { createUseStyles } from "react-jss";

export default function PercentOfChangeIcon({
  percentOfChange,
}: {
  percentOfChange: number;
}) {
  const classes = styles();
  const isIncrease: boolean = percentOfChange > 0;

  if (percentOfChange !== 0) {
    return (
      <div
        className={`${classes.triangle} ${
          isIncrease ? classes.triangle_increase : classes.triangle_decrease
        }`}
      ></div>
    );
  } else {
    return (
      <div className={classes.equals}>
        <div className={classes.equals__item}></div>
        <div className={classes.equals__item}></div>
      </div>
    );
  }
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

  equals: {
    position: "absolute",
    left: "10.5%",
    top: "36%",

    width: "30px !important",
    height: 17,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  equals__item: {
    width: "100% !important",
    height: 5,

    background: "black",
  },
});
