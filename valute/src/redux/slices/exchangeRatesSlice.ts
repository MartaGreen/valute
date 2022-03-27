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
  REQUEST_MSGS,
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
    //! error handling test
    //? getting random 0 or 1. If it is 0 send error
    // const testing: number = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    // if (testing) {
    // } else {
    //   return rejectWithValue("Server error! Could not get previous rates");
    // }

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
    prevRatesStatus: "empty",
    previousUrl: "",
    exchangeRatesData: [] as IExchangeRateData[],
    countOfPreviousRates: [] as IExchangeRateData[],
    insertionIndex: NaN,
    isClosed: false,
    waitMsg: "",
  },
  reducers: {
    setInsertionIndex: (state, action) => {
      if (state.insertionIndex !== action.payload + 1) {
        state.insertionIndex = action.payload + 1;
      } else {
        state.insertionIndex = NaN;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchangeRatesRequest.pending, (state) => {
      state.status = REQUEST_STATUS.pending;
      state.waitMsg = REQUEST_MSGS.pending;
    });
    builder.addCase(exchangeRatesRequest.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.success;
      state.exchangeRatesData = ObjectToArray(action.payload.Valute);
      state.previousUrl = action.payload.PreviousURL;
    });
    builder.addCase(exchangeRatesRequest.rejected, (state, action) => {
      state.status = REQUEST_STATUS.error;
      state.waitMsg = REQUEST_MSGS.error;
    });

    builder.addCase(getPreviousRatesRequest.pending, (state) => {
      state.prevRatesStatus = REQUEST_STATUS.pending;
      state.waitMsg = REQUEST_MSGS.pending;
    });
    builder.addCase(getPreviousRatesRequest.fulfilled, (state, action) => {
      state.prevRatesStatus = REQUEST_STATUS.success;
      state.countOfPreviousRates = action.payload;
    });
    builder.addCase(getPreviousRatesRequest.rejected, (state, action) => {
      state.prevRatesStatus = REQUEST_STATUS.error;
      state.waitMsg = REQUEST_MSGS.error;
    });
  },
});

export const { setInsertionIndex } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
