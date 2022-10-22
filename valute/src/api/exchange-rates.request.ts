import {
  ExchangeRateType,
  ExchangeRatesRequestType,
} from "../types/exchange-rates.types";
import { EXCHANGE_RATES_EN_NAMES } from "../constants/exchange-rates.constants";

export async function getExchangeRates(requestURL: string) {
  try {
    const response: Response = await fetch(requestURL);
    if (!response.ok) throw new Error(`Server error ${response.statusText}`);

    const exchangeRatesReqData: ExchangeRatesRequestType =
      await response.json();
    const exchangeRates = exchangeRatesReqData.Valute;
    Object.keys(exchangeRates).forEach((key: string) => {
      const valuteName = exchangeRates[key].Name;
      exchangeRates[key].Name = EXCHANGE_RATES_EN_NAMES[valuteName];
    });
    console.log("exchangeRates", exchangeRates);
    exchangeRatesReqData.Valute = exchangeRates;

    return exchangeRatesReqData;
  } catch (err) {
    console.log("error occurred while getting data from server", err);
    return null;
  }
}

/*
  prevRatesCount: amount of previous rates
  prevRequestURL: previous exchange rate request url
  valuteCharCode: exchange rate code
  
  i: recursion integer
  resultArr: storage for previous rates
*/
export async function getPrevExchangeRates(
  prevRatesCount: number,
  prevRequestURL: string,
  valuteCharCode: string,
  i = 0,
  resultArr: ExchangeRateType[] = []
) {
  const prevExchangeRates: ExchangeRateType[] | null = await (async () => {
    if (i < prevRatesCount) {
      i++;

      const exchangeRatesReqData: ExchangeRatesRequestType | null =
        await getExchangeRates(prevRequestURL);
      if (!exchangeRatesReqData) return null;

      prevRequestURL = exchangeRatesReqData.PreviousURL;
      const exchangeRate: ExchangeRateType = {
        ...exchangeRatesReqData.Valute[valuteCharCode],
        Date: exchangeRatesReqData.Date,
      };
      exchangeRate.isPrevious = true;
      resultArr.push(exchangeRate);

      await getPrevExchangeRates(
        prevRatesCount,
        prevRequestURL,
        valuteCharCode,
        i,
        resultArr
      );
    }

    return resultArr;
  })();

  return prevExchangeRates;
}
