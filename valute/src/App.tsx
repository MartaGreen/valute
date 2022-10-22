import React from "react";
import styles from "./App.style";

import ExchangeRates from "./components/exchangeRates/exchangeRates";
import Search from "./components/search/search";
import formatDate from "./shared/formateDate";

function App() {
  const classes = styles();

  return (
    <main>
      <h1 className={classes.title}>
        <b style={{ textTransform: "uppercase" }}>Rub</b> Exchange Rate
      </h1>
      <Search />
      <ExchangeRates />
    </main>
  );
}

export default App;
