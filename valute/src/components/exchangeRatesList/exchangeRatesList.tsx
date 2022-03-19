import React, { useEffect, useState } from "react";
import styles from "./exchangeRatesList.style";

import { getTodayExchangeRatesData } from "../../serverData/exchangeRatesDataRequest";
import {
  IExchangeRate,
  IExchangeRatesRequestData,
  IExchangeRateData,
} from "../../interfaces/exchangeRatesInterfaces";

import ExhangeRateElement from "../exchangeRateElement/exchangeRateElement";

export default function ExhangeRatesList() {
  const classes = styles();

  const [exchangeRatesData, setExhangeRatesData] = useState(
    [] as IExchangeRateData[]
  );
  const [previousReqURL, setPreviousReqURL] = useState("");

  useEffect(() => {
    const getReqData = async () => {
      const exchangeRatesReqData: IExchangeRatesRequestData | null =
        await getTodayExchangeRatesData();

      if (exchangeRatesReqData) {
        const exchangeRatesDataArray: IExchangeRateData[] = ObjectToArray(
          exchangeRatesReqData.Valute
        );
        setExhangeRatesData(exchangeRatesDataArray);

        setPreviousReqURL(exchangeRatesReqData.PreviousURL);
      }
    };

    getReqData().catch((err) =>
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
        {exchangeRatesData.length ? (
          exchangeRatesData.map(
            (exchangeRateItem: IExchangeRateData, index: number) => {
              return (
                <ExhangeRateElement
                  exchangeRateData={exchangeRateItem}
                  key={`exchRate_${index + 1}`}
                />
              );
            }
          )
        ) : (
          <tr className={classes.loadingList}>
            <td colSpan={3}>Loading ...</td>
          </tr>
        )}
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
