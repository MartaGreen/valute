import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRatesTable: {
    width: "80%",
    minWidth: 300,
    maxWidth: 1000,

    margin: "30px auto",
    borderCollapse: "collapse",
    border: 0,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    borderRadius: 10,
  },

  exchangeRatesTable__header: {
    background: "#e2e3e0",
  },

  exchangeRatesTable__th: {
    padding: "30px 0",
    width: "33.33%",
  },

  loadingList: {
    textAlign: "center",
    verticalAlign: "center",
  },

  "@media (max-width: 400px)": {
    exchangeRatesTable: {
      fontSize: 13,
    },
  },
});

export default styles;
