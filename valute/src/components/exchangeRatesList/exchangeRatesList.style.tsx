import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRateList: {
    width: "100%",
    minWidth: 320,
    maxWidth: 1200,

    margin: "0 auto",
  },

  exchangeRateList__item: {
    padding: 15,
  },

  loadingList: {
    textAlign: "center",
    verticalAlign: "center",
  },
});

export default styles;
