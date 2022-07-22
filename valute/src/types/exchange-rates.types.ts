export type ExchangeRatesRequestType = {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: ExchangeRatesType;
};

export type ExchangeRatesType = {
  [exchangeRateName: string]: ExchangeRateType;
};

export type ExchangeRateType = {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
  isPrevious: boolean;
};

// export type IPercentOfChangeObj = {
//   [exchangeRateCode: string]: number;
// };

export type ExchangeRateStateType = {
  currentReqStatus: string; // request: get current exchange rates
  prevReqStatus: string; // request: get previous exchange rates
  exchangeRates: ExchangeRateType[];
  prevExchangeRates: ExchangeRateType[];
  prevReqUrl: string;
  insertionIndex: number;
  // isClosed: boolean;
  waitMsg: string;
};
