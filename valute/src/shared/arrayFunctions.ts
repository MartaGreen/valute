import {
  ExchangeRatesType,
  ExchangeRateType,
} from "../types/exchange-rates.types";

export function ObjectToArray(obj: ExchangeRatesType) {
  const exchangeRatesCodes: string[] = Object.keys(obj);
  const exchangeRatesArray: (ExchangeRateType | null)[] = [];
  exchangeRatesCodes.forEach((exchangeRatesCode) => {
    exchangeRatesArray.push(obj[exchangeRatesCode]);
    exchangeRatesArray.push(null);
  });
  return exchangeRatesArray;
}

export function insertionByIndex(
  array: ExchangeRateType[],
  insertion: ExchangeRateType[],
  index: number
) {
  if (index) {
    const arrayStart: ExchangeRateType[] = array.slice(0, index);
    const arrayEnd: ExchangeRateType[] = array.slice(index);
    return [...arrayStart, ...insertion, ...arrayEnd];
  } else {
    return array;
  }
}
