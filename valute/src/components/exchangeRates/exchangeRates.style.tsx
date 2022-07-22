import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRateList: {
    width: "100%",
    minWidth: 320,
    maxWidth: 1440,

    margin: "0 auto",
    borderCollapse: "collapse",
    border: 0,
  },

  exchangeRateList__header: {
    background: "#e2e3e0",
  },

  exchangeRateList__item: {
    padding: 30,
  },

  loadingList: {
    textAlign: "center",
    verticalAlign: "center",
  },

  "@media (max-width: 400px)": {
    exchangeRateList__item: { padding: "30px 10px" },
  },
});

export default styles;
