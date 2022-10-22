import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getExchangeRates } from "../../api/exchange-rates.request";
import { TODAY_REQUEST_URL } from "../../constants/request.constants";
import {
  ExchangeRateType,
  ExchangeRatesRequestType,
} from "../../types/exchange-rates.types";
import { transformRateObjectToArray } from "../../shared/arrayFunctions";
import { REQUEST_STATUS } from "../../constants/request.constants";

export const exchangeRatesReducer = createAsyncThunk(
  "exchangeRates/getCurrent",
  async (_, { rejectWithValue }) => {
    const requestData: ExchangeRatesRequestType | null = await getExchangeRates(
      TODAY_REQUEST_URL
    );

    if (!requestData) return rejectWithValue("Server error");
    return requestData;
  }
);

export const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
  initialState: {
    status: "empty",
    prevReqUrl: "",
    exchangeRates: [] as (ExchangeRateType | null)[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exchangeRatesReducer.pending, (state) => {
      state.status = REQUEST_STATUS.pending;
    });
    builder.addCase(exchangeRatesReducer.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.success;
      state.exchangeRates = transformRateObjectToArray(action.payload.Valute);
      state.prevReqUrl = action.payload.PreviousURL;
    });
    builder.addCase(exchangeRatesReducer.rejected, (state) => {
      state.status = REQUEST_STATUS.error;
    });
  },
});

export default exchangeRatesSlice.reducer;
