import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExchangeRatesData } from "../../serverData/exchangeRatesDataRequest";
import { TODAY_REQUEST_URL } from "../../constants/requestsConstants";
import {
  IExchangeRateData,
  IExchangeRatesRequestData,
} from "../../interfaces/exchangeRatesInterfaces";
import { ObjectToArray } from "../../shared/arrayFunctions";
import { REQUEST_STATUS } from "../../constants/requestsConstants";

export const exchangeRatesRequest = createAsyncThunk(
  "exchangeRates/getCurrentData",
  async (_, { rejectWithValue }) => {
    const requestData: IExchangeRatesRequestData | null =
      await getExchangeRatesData(TODAY_REQUEST_URL);
    if (requestData) return requestData;
    else return rejectWithValue("Server error");
  }
);

export const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
  initialState: {
    status: "empty",
    previousUrl: "",
    exchangeRatesData: [] as IExchangeRateData[],
    countOfPreviousRates: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exchangeRatesRequest.pending, (state) => {
      console.log("pending");
      state.status = REQUEST_STATUS.pending;
    });
    builder.addCase(exchangeRatesRequest.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.success;
      state.exchangeRatesData = ObjectToArray(action.payload.Valute);
    });
  },
});

export default exchangeRatesSlice.reducer;
