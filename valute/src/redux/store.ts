import { configureStore } from "@reduxjs/toolkit";
import exchangeRatesReducer from "./slices/exchange-rate.slice";

export default configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
  },
});
