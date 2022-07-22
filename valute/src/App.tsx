import React from "react";
import styles from "./App.style";

import ExchangeRates from "./components/exchangeRates/exchangeRates";

function App() {
  const classes = styles();

  return (
    <main>
      <h1 className={classes.title}>Курс валют на сегодня</h1>
      <ExchangeRates />
    </main>
  );
}

export default App;
