import { configureStore } from "@reduxjs/toolkit";
import exchangeRatesReducer from "./slices/exchange-rates.slice";
import prevExchangeRatesReducer from "./slices/prev-exchange-rates.slice";

export default configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
    prevExchangeRates: prevExchangeRatesReducer,
  },
});
