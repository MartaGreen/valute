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

export type ExchangeRateStateType = {
  status: string;
  exchangeRates: ExchangeRateType[];
  prevReqUrl: string;
};

export type PrevExchangeRateStateType = {
  status: string;
  prevExchangeRates: ExchangeRateType[];
  activeExchangeRate: string; // exchange rate's code to see prev values
  isHidden: boolean;
};
