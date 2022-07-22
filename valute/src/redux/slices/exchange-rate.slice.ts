import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPrevExchangeRates,
  getExchangeRates,
} from "../../api/exchange-rates.request";
import { TODAY_REQUEST_URL } from "../../constants/request.constants";
import {
  ExchangeRateType,
  ExchangeRatesRequestType,
} from "../../types/exchange-rates.types";
import { ObjectToArray } from "../../shared/arrayFunctions";
import {
  REQUEST_STATUS,
  COUNT_OF_PREVIOUS_RATES,
  REQUEST_MSGS,
} from "../../constants/request.constants";

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

export const prevExchangeRatesReducer = createAsyncThunk(
  "exchangeRates/getPrevious",
  async (
    { prevReqUrl, charCode }: { prevReqUrl: string; charCode: string },
    { rejectWithValue }
  ) => {
    //! error handling test
    //? getting random 0 or 1. If it is 0 send error
    // const testing: number = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    // if (testing) {
    // } else {
    //   return rejectWithValue("Server error! Could not get previous rates");
    // }

    const prevExchangeRates: ExchangeRateType[] | null =
      await getPrevExchangeRates(COUNT_OF_PREVIOUS_RATES, prevReqUrl, charCode);

    if (!prevExchangeRates)
      return rejectWithValue("Server error! Could not get previous rates");
    return prevExchangeRates;
  }
);

export const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
  initialState: {
    currentReqStatus: "empty",
    prevReqStatus: "empty",
    prevReqUrl: "",
    exchangeRates: [] as ExchangeRateType[],
    prevExchangeRates: [] as ExchangeRateType[],
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
    builder.addCase(exchangeRatesReducer.pending, (state) => {
      state.currentReqStatus = REQUEST_STATUS.pending;
      state.waitMsg = REQUEST_MSGS.pending;
    });
    builder.addCase(exchangeRatesReducer.fulfilled, (state, action) => {
      state.currentReqStatus = REQUEST_STATUS.success;
      state.exchangeRates = ObjectToArray(action.payload.Valute);
      state.prevReqUrl = action.payload.PreviousURL;
    });
    builder.addCase(exchangeRatesReducer.rejected, (state, action) => {
      state.currentReqStatus = REQUEST_STATUS.error;
      state.waitMsg = REQUEST_MSGS.error;
    });

    builder.addCase(prevExchangeRatesReducer.pending, (state) => {
      state.prevReqStatus = REQUEST_STATUS.pending;
      state.waitMsg = REQUEST_MSGS.pending;
    });
    builder.addCase(prevExchangeRatesReducer.fulfilled, (state, action) => {
      state.prevReqStatus = REQUEST_STATUS.success;
      state.prevExchangeRates = action.payload;
    });
    builder.addCase(prevExchangeRatesReducer.rejected, (state, action) => {
      state.prevReqStatus = REQUEST_STATUS.error;
      state.waitMsg = REQUEST_MSGS.error;
    });
  },
});

export const { setInsertionIndex } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
