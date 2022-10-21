import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPrevExchangeRates } from "../../api/exchange-rates.request";
import {
  COUNT_OF_PREVIOUS_RATES,
  REQUEST_STATUS,
} from "../../constants/request.constants";
import { ExchangeRateType } from "../../types/exchange-rates.types";

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

const prevExchangeRatesSlice = createSlice({
  name: "prevExchangeRate",
  initialState: {
    status: "empty",
    prevExchangeRates: [] as ExchangeRateType[],
    activeExchangeRate: "",
    isHidden: false,
  },
  reducers: {
    updateActiveExchangeRate: (state, action) => {
      state.activeExchangeRate = action.payload;
    },

    resetPrevRates: (state) => {
      state.prevExchangeRates = [];
      state.isHidden = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(prevExchangeRatesReducer.pending, (state) => {
      state.isHidden = false;
      state.status = REQUEST_STATUS.pending;
    });
    builder.addCase(prevExchangeRatesReducer.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.success;
      state.prevExchangeRates = action.payload;
    });
    builder.addCase(prevExchangeRatesReducer.rejected, (state) => {
      state.status = REQUEST_STATUS.error;
    });
  },
});

export const { updateActiveExchangeRate, resetPrevRates } =
  prevExchangeRatesSlice.actions;
export default prevExchangeRatesSlice.reducer;
