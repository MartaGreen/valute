import { configureStore } from "@reduxjs/toolkit";
import exchangeRatesReducer from "./slices/exchangeRatesSlice";

export default configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
  },
});
