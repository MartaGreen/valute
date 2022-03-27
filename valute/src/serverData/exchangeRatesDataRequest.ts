import {
  IExchangeRateData,
  IExchangeRatesRequestData,
} from "../interfaces/exchangeRatesInterfaces";

export async function getExchangeRatesData(requestURL: string) {
  try {
    const exchangeRatesResponse: Response = await fetch(requestURL);
    if (!exchangeRatesResponse.ok)
      throw new Error(`Server error ${exchangeRatesResponse.statusText}`);
    const exchangeRatesReqData: IExchangeRatesRequestData =
      await exchangeRatesResponse.json();

    return exchangeRatesReqData;
  } catch (err) {
    console.log("error occurred while getting data from server", err);
    return null;
  }
}

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
  const previousRatesDataArr: IExchangeRateData[] | null = await (async () => {
    if (i < count) {
      i += 1;
      const exchangeRatesData: IExchangeRatesRequestData | null =
        await getExchangeRatesData(reqUrl);

      if (exchangeRatesData) {
        reqUrl = exchangeRatesData.PreviousURL;
        const exchangeRateData: IExchangeRateData =
          exchangeRatesData.Valute[charCode];
        exchangeRateData.isPrevious = true;
        saveArr.push(exchangeRateData);

        await getCountOfPreviousRates(count, i, reqUrl, saveArr, charCode);
      } else {
        return null;
      }
    }
    return saveArr;
  })();
  return previousRatesDataArr;
}
