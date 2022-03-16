import React from "react";

import { getTodayExchangeRatesData } from "./serverData/exchangeRatesDataRequest";

import ExhangeRatesList from "./components/exchangeRatesList/exchangeRatesList";

function App() {
  getTodayExchangeRatesData();
  return (
    <div>
      <ExhangeRatesList />
    </div>
  );
}

export default App;
