import {
  ExchangeRatesType,
  ExchangeRateType,
} from "../types/exchange-rates.types";

export function transformRateObjectToArray(
  obj: ExchangeRatesType
): ExchangeRateType[] {
  const exchangeRatesCodes: string[] = Object.keys(obj);
  const exchangeRatesArray: ExchangeRateType[] = exchangeRatesCodes.map(
    (code: string) => {
      return obj[code];
    }
  );
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
