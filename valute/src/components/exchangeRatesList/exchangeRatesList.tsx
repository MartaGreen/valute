import React, { useEffect, useState } from "react";
import styles from "./exchangeRatesList.style";

import { getTodayExchangeRatesData } from "../../serverData/exchangeRatesDataRequest";
import {
  IExchangeRate,
  IExchangeRatesRequestData,
  IExchangeRateData,
} from "../../interfaces/exchangeRatesInterfaces";

export default function ExhangeRatesList() {
  const classes = styles();

  const [exchangeRatesData, setExhangeRatesData] = useState(
    [] as IExchangeRateData[]
  );
  const [previousReqURL, setPreviousReqURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const exchangeRatesReqData: IExchangeRatesRequestData | null =
        await getTodayExchangeRatesData();
      console.log(exchangeRatesReqData);

      if (exchangeRatesReqData) {
        const exchangeRatesDataArr: IExchangeRateData[] = ObjectToArray(
          exchangeRatesReqData.Valute
        );
        setExhangeRatesData(exchangeRatesDataArr);

        setPreviousReqURL(exchangeRatesReqData.PreviousURL);
      }
    };

    fetchData().catch((err) =>
      console.log("error occurred while getting data in useEffect", err)
    );
  }, []);

  return (
    <table className={classes.exchangeRateList}>
      <thead>
        <tr>
          <th className={classes.exchangeRateList__item}>Код валюты</th>
          <th className={classes.exchangeRateList__item}>Курс (руб)</th>
          <th className={classes.exchangeRateList__item}>
            Изменение курса (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {exchangeRatesData.map((exchangeRateItem) => {
          return (
            <tr>
              <td>text</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ObjectToArray(obj: IExchangeRate) {
  const exchangeRatesNames: string[] = Object.keys(obj);
  const exchangeRatesArray: IExchangeRateData[] = exchangeRatesNames.map(
    (exchangeRateName) => obj[exchangeRateName]
  );
  return exchangeRatesArray;
}
