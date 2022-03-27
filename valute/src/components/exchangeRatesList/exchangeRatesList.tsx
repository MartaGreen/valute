import React, { useEffect } from "react";
import styles from "./exchangeRatesList.style";
import { useDispatch, useSelector } from "react-redux";
import { exchangeRatesRequest } from "../../redux/slices/exchangeRatesSlice";

import { REQUEST_STATUS } from "../../constants/requestsConstants";
import {
  IExchangeRateData,
  IExchangeRatesStore,
} from "../../interfaces/exchangeRatesInterfaces";
import { insertionByIndex } from "../../shared/arrayFunctions";

import ExchangeRateElement from "../exchangeRateElement/exchangeRateElement";
import PrevExchangeRatesList from "../prevExchangeRatesList/prevExchangeRatesList";

export default function ExhangeRatesList() {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: IExchangeRatesStore }) => state.exchangeRates
  );
  const status: string = storeData.status;
  const exchangeRatesData: IExchangeRateData[] = storeData.exchangeRatesData;
  const insertionIndex: number = storeData.insertionIndex;
  const waitMsg: string = storeData.waitMsg;
  const dispatch = useDispatch();

  // insert empty object as a symbol to render previous values
  const exchangeRates: IExchangeRateData[] = insertionByIndex(
    exchangeRatesData,
    [{} as IExchangeRateData],
    insertionIndex
  );

  useEffect(() => {
    dispatch(exchangeRatesRequest());
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
        {status === REQUEST_STATUS.success ? (
          exchangeRates.map(
            (exchangeRate: IExchangeRateData, index: number) => {
              if (!Object.keys(exchangeRate).length)
                return <PrevExchangeRatesList key={`exch_rate-${index}`} />;
              else
                return (
                  <ExchangeRateElement
                    exchangeRateData={exchangeRate}
                    itemCounter={index}
                    key={`exch_rate-${index}`}
                  />
                );
            }
          )
        ) : (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              {waitMsg}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
