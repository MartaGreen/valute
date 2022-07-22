import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  exchangeRate: {
    position: "relative",

    "&:hover $exchangeRate__btn": {
      // background: "#fef8d1",
      opacity: "100%",
    },
  },

  exchangeRate_previous: {
    background: "#FFE7BA",

    "& > :first-child": {},
  },

  exchangeRate__column: {
    position: "relative",
    textAlign: "center",

    padding: 20,
  },

  exchangeRate__btn: {
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
    ourline: "none",
    cursor: "pointer",
  },

  exchangeRate__percOfChange: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },

  "@media (max-width: 400px)": {
    exchangeRate__column: { padding: "30px 5px" },
  },
});

export default styles;
