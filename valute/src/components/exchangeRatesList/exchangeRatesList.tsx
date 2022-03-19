import React, { useEffect, useState } from "react";
import styles from "./exchangeRatesList.style";

import {
  getExchangeRatesData,
  getPercentOfChange,
} from "../../serverData/exchangeRatesDataRequest";
import { TODAY_REQUEST_URL } from "../../constants/requestsConstants";
import {
  IExchangeRate,
  IExchangeRatesRequestData,
  IExchangeRateData,
  IPercentOfChangeObj,
} from "../../interfaces/exchangeRatesInterfaces";

import ExhangeRateElement from "../exchangeRateElement/exchangeRateElement";

export default function ExhangeRatesList() {
  const classes = styles();

  const [exchangeRatesData, setExhangeRatesData] = useState(
    [] as IExchangeRateData[]
  );
  const [percentOfChange, setPercentOfChange] = useState(
    {} as IPercentOfChangeObj
  );

  useEffect(() => {
    const getReqData = async () => {
      const exchangeRatesReqData: IExchangeRatesRequestData | null =
        await getExchangeRatesData(TODAY_REQUEST_URL);

      if (exchangeRatesReqData) {
        const exchangeRatesDataArray: IExchangeRateData[] = ObjectToArray(
          exchangeRatesReqData.Valute
        );
        setExhangeRatesData(exchangeRatesDataArray);

        const previousExchangeRatesURL = exchangeRatesReqData.PreviousURL;
        const percentOfChangeObj = await getPercentOfChange(
          previousExchangeRatesURL,
          exchangeRatesDataArray
        );
        setPercentOfChange(percentOfChangeObj);
      }
    };

    getReqData().catch((err) =>
      console.log("error occurred while getting data in useEffect", err)
    );
  }, []);

  return (
    <table className={classes.exchangeRateList}>
      <thead className={classes.exchangeRateList__header}>
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
                  itemCounter={index}
                  percentOfChangeData={percentOfChange}
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
