export interface IExchangeRatesRequestData {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: IExchangeRate;
}

export interface IExchangeRate {
  [exchangeRateName: string]: IExchangeRateData;
}

export interface IExchangeRateData {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export interface IPercentOfChangeObj {
  [exchangeRateCode: string]: number;
}
