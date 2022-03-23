import {
  IExchangeRate,
  IExchangeRateData,
} from "../interfaces/exchangeRatesInterfaces";

export function ObjectToArray(obj: IExchangeRate) {
  const exchangeRatesNames: string[] = Object.keys(obj);
  const exchangeRatesArray: IExchangeRateData[] = exchangeRatesNames.map(
    (exchangeRateName) => obj[exchangeRateName]
  );
  return exchangeRatesArray;
}
