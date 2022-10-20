import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  search: {
    minWidth: 300,
    maxWidth: 600,
    width: "90%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #000",
  },

  search__field: {
    width: "100%",
    height: 50,
    padding: "0 20px",
    fontSize: 17,
  },

  search__btn: {
    borderRadius: 10,
    padding: "10px 0",
    width: 60,
    fontSize: 15,
    cursor: "pointer",
  },

  markerElement: {
    background: "rgb(255 229 156) !important",
  },
});

export default styles;
