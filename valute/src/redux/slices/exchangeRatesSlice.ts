import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCountOfPreviousRates,
  getExchangeRatesData,
} from "../../serverData/exchangeRatesDataRequest";
import { TODAY_REQUEST_URL } from "../../constants/requestsConstants";
import {
  IExchangeRateData,
  IExchangeRatesRequestData,
} from "../../interfaces/exchangeRatesInterfaces";
import { ObjectToArray } from "../../shared/arrayFunctions";
import {
  REQUEST_STATUS,
  COUNT_OF_PREVIOUS_RATES,
} from "../../constants/requestsConstants";

export const exchangeRatesRequest = createAsyncThunk(
  "exchangeRates/getCurrentData",
  async (_, { rejectWithValue }) => {
    const requestData: IExchangeRatesRequestData | null =
      await getExchangeRatesData(TODAY_REQUEST_URL);
    if (requestData) return requestData;
    else return rejectWithValue("Server error");
  }
);

export const getPreviousRatesRequest = createAsyncThunk(
  "exchangeRates/getPreviousRates",
  async (
    { previousUrl, charCode }: { previousUrl: string; charCode: string },
    { rejectWithValue }
  ) => {
    const previousRatesData: IExchangeRateData[] | null =
      await getCountOfPreviousRates(
        COUNT_OF_PREVIOUS_RATES,
        0,
        previousUrl,
        [],
        charCode
      );

    if (previousRatesData) return previousRatesData;
    else return rejectWithValue("Server error! Could not get previous rates");
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
  reducers: {
    getPreviousRates: (state, action) => {
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchangeRatesRequest.pending, (state) => {
      console.log("pending");
      state.status = REQUEST_STATUS.pending;
    });
    builder.addCase(exchangeRatesRequest.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.success;
      state.exchangeRatesData = ObjectToArray(action.payload.Valute);
      state.previousUrl = action.payload.PreviousURL;
    });

    builder.addCase(getPreviousRatesRequest.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default exchangeRatesSlice.reducer;
