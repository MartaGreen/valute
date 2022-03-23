import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  prevRateLine: {
    "& :first-child": {
      width: "29%",
    },
    "& :nth-child(2)": {
      width: "27%",
    },
  },

  prevRateLine__td: {
    position: "relative",
    // width: "33.33%",

    textAlign: "center",

    padding: "13px 10px",
  },
});

export default styles;
