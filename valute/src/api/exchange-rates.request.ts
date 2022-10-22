import {
  ExchangeRateType,
  ExchangeRatesRequestType,
} from "../types/exchange-rates.types";
import { EXCHANGE_RATES_EN_NAMES } from "../constants/exchange-rates.constants";

export async function getExchangeRates(requestURL: string) {
  try {
    const response: Response = await fetch(requestURL);
    if (!response.ok) throw new Error(`Server error ${response.statusText}`);

    const requestData: ExchangeRatesRequestType = await response.json();
    const exchangeRates = requestData.Valute;

    // translate currency names to en
    Object.keys(exchangeRates).forEach((key: string) => {
      const valuteName = exchangeRates[key].Name;
      exchangeRates[key].Name = EXCHANGE_RATES_EN_NAMES[valuteName];
    });
    requestData.Valute = exchangeRates;

    return requestData;
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
  prevValuteArr: ExchangeRateType[] = []
) {
  const prevExchangeRates: ExchangeRateType[] | null = await (async () => {
    if (i < prevRatesCount) {
      i++;

      const requestData: ExchangeRatesRequestType | null =
        await getExchangeRates(prevRequestURL);
      if (!requestData) return null;

      prevRequestURL = requestData.PreviousURL;
      const exchangeRate: ExchangeRateType = {
        ...requestData.Valute[valuteCharCode],
        Date: requestData.Date,
      };
      exchangeRate.isPrevious = true;
      prevValuteArr.push(exchangeRate);

      await getPrevExchangeRates(
        prevRatesCount,
        prevRequestURL,
        valuteCharCode,
        i,
        prevValuteArr
      );
    }

    return prevValuteArr;
  })();

  return prevExchangeRates;
}
