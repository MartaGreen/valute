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

// function insertionByIndex(
//   array: IExchangeRateData[],
//   insertion: IExchangeRateData[],
//   index: number
// ) {
//   index += 1;

//   const arrayStart: IExchangeRateData[] = array.slice(0, index);
//   const arrayEnd: IExchangeRateData[] = array.slice(index);
//   return [...arrayStart, ...insertion, ...arrayEnd];
// }

// function deleteByIndex(
//   array: IExchangeRateData[],
//   deleteIndex: number,
//   delCount: number
// ) {
//   if (deleteIndex !== -1) {
//     deleteIndex += 1;
//     console.log(array[deleteIndex]);
//     const arrStart: IExchangeRateData[] = array.slice(0, deleteIndex);
//     const arrEnd: IExchangeRateData[] = array.slice(deleteIndex + delCount);
//     console.log(arrStart);
//     console.log(arrEnd);

//     return [...arrStart, ...arrEnd];
//   }

//   return array;
// }
