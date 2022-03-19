import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRateElement: {
    cursor: "pointer",
    transition: ".4s",

    "&:hover": {
      background: "#fef8d1",
    },
  },
  grayBg: {
    background: "#eeefed",
  },

  exchangeRateElement__column: {
    padding: 20,
  },

  "@media (max-width: 400px)": {
    exchangeRateElement__column: { padding: "30px 5px" },
  },
});

export default styles;
