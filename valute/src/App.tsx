import React from "react";

import { getTodayValuteData } from "./serverData/getValuteDataRequests";

import ExhangeRatesList from "./components/exchangeRatesList/exchangeRatesList";

function App() {
  getTodayValuteData();
  return (
    <div>
      <ExhangeRatesList />
    </div>
  );
}

export default App;
