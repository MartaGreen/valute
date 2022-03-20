import {
  IExchangeRateData,
  IExchangeRatesRequestData,
} from "../interfaces/exchangeRatesInterfaces";

export async function getExchangeRatesData(requestURL: string) {
  try {
    const exchangeRatesResponse: Response = await fetch(requestURL);
    const exchangeRatesReqData: IExchangeRatesRequestData =
      await exchangeRatesResponse.json();

    return exchangeRatesReqData;
  } catch (err) {
    console.log("error occurred while getting data from server", err);
    return null;
  }
}

// export async function getPercentOfChange(
//   previousRequestURL: string,
//   todayExchangeRatesArray: IExchangeRateData[]
// ) {
//   const previosExchangeRatesResponse: IExchangeRatesRequestData | null =
//     await getExchangeRatesData(previousRequestURL);
//   const previousExchangesRateData: IExchangeRate | undefined =
//     previosExchangeRatesResponse?.Valute;

//   const percentOfChangeObj: IPercentOfChangeObj = {};

//   if (previousExchangesRateData) {
//     todayExchangeRatesArray.forEach((exchangeRate) => {
//       const previousExchangeRate: number =
//         previousExchangesRateData[exchangeRate.CharCode].Value;
//       const changePercent = calculatePercentOfChange(
//         exchangeRate.Value,
//         previousExchangeRate
//       );

//       percentOfChangeObj[exchangeRate.CharCode] = changePercent;
//     });
//   }

//   return percentOfChangeObj;
// }

export function calculatePercentOfChange(
  newValue: number,
  previousValue: number
) {
  const percent: number = ((newValue - previousValue) / previousValue) * 100;
  const fixedPercent: number = Number(percent.toFixed(2));
  return fixedPercent;
}

/*
  count: the number of previous ratings
  i: integer of recursive function
  reqUrl: previous exchange rates request
  saveArr: storage of all received data
  charCode: exchange rate code
*/
export async function getCountOfPreviousRates(
  count: number,
  i: number,
  reqUrl: string,
  saveArr: IExchangeRateData[],
  charCode: string
) {
  if (i < count) {
    i += 1;
    const exchangeRatesData: IExchangeRatesRequestData | null =
      await getExchangeRatesData(reqUrl);

    if (exchangeRatesData) {
      reqUrl = exchangeRatesData.PreviousURL;
      const exchangeRateData: IExchangeRateData =
        exchangeRatesData.Valute[charCode];
      saveArr.push(exchangeRateData);

      getCountOfPreviousRates(count, i, reqUrl, saveArr, charCode);
    }
  }

  return saveArr;
}
