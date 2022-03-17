import { IExchangeRatesRequestData } from "../interfaces/exchangeRatesInterfaces";

export async function getTodayExchangeRatesData() {
  try {
    const exchangeRatesResponse: Response = await fetch(
      "https://www.cbr-xml-daily.ru/daily_json.js"
    );
    const exchangeRatesReqData: IExchangeRatesRequestData =
      await exchangeRatesResponse.json();

    console.log(typeof exchangeRatesReqData);
    return exchangeRatesReqData;
  } catch (err) {
    console.log("error occurred while getting data from server", err);
    return null;
  }
}
