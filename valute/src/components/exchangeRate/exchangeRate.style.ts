import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRateTable__tr: {
    position: "relative",

    "&:hover $exchangeRateTable__showBtn": {
      opacity: "100%",
    },
  },

  exchangeRateTable__td: {
    position: "relative",
    textAlign: "center",

    padding: 20,
  },

  exchangeRateTable__showBtn: {
    position: "absolute",
    right: 30,
    top: "35%",

    height: 15,
    width: 15,

    border: "none",
    borderBottom: "3px solid gray",
    borderRight: "3px solid gray",
    transform: "rotate(45deg)",

    opacity: 0,
    transition: ".4s",

    background: "none",
    outline: "none",
    cursor: "pointer",
  },

  exchangeRateTable__change: {},

  "@media screen and (max-width: 1024px)": {
    exchangeRateTable__showBtn: {
      opacity: "100%",
    },
  },

  "@media screen and (max-width: 550px)": {
    exchangeRateTable__showBtn: {
      right: 13,
      top: "32%",

      borderBottom: "2px solid gray",
      borderRight: "2px solid gray",
    },
  },

  "@media screen and (max-width: 350px)": {
    exchangeRateTable__showBtn: {
      right: 10,
      top: "34%",

      width: 13,
      height: 13,

      borderBottom: "2px solid gray",
      borderRight: "2px solid gray",
    },
  },
});

export default styles;
