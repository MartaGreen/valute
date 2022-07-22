import React, { useEffect, useState } from "react";
import styles from "./exchangeRates.style";
import { useDispatch, useSelector } from "react-redux";
import { exchangeRatesReducer } from "../../redux/slices/exchange-rate.slice";

import { REQUEST_STATUS } from "../../constants/request.constants";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";

import ExchangeRate from "../exchangeRate/exchangeRate";
import PrevExchangeRates from "../prevExchangeRates/prevExchangeRates";

export default function ExchangeRates() {
  const classes = styles();
  let charCode = "";

  const storeData = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const status: string = storeData.currentReqStatus;
  const exchangeRates: (ExchangeRateType | null)[] = storeData.exchangeRates;
  const waitMsg: string = storeData.waitMsg;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exchangeRatesReducer());
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
        {status === REQUEST_STATUS.pending && (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              {waitMsg}
            </td>
          </tr>
        )}
        {status === REQUEST_STATUS.success &&
          exchangeRates.map(
            (exchangeRate: ExchangeRateType | null, index: number) => {
              if (!exchangeRate) {
                return <PrevExchangeRates charCode={charCode} key={index} />;
              }

              charCode = exchangeRate.CharCode;
              return (
                <ExchangeRate
                  exchangeRateData={exchangeRate}
                  itemCounter={index}
                  key={exchangeRate.ID}
                />
              );
            }
          )}
      </tbody>
    </table>
  );
}
