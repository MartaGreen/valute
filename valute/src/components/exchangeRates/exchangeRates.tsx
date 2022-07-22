import React, { useEffect, useState } from "react";
import styles from "./exchangeRates.style";
import { useDispatch, useSelector } from "react-redux";
import { exchangeRatesReducer } from "../../redux/slices/exchange-rates.slice";

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
  const status: string = storeData.status;
  const exchangeRates: (ExchangeRateType | null)[] = storeData.exchangeRates;
  const waitMsg: string = "Loading ...";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exchangeRatesReducer());
  }, []);

  return (
    <table className={classes.exchangeRatesTable}>
      <thead className={classes.exchangeRatesTable__header}>
        <tr>
          <th className={classes.exchangeRatesTable__item}>Код валюты</th>
          <th className={classes.exchangeRatesTable__item}>Курс (руб)</th>
          <th className={classes.exchangeRatesTable__item}>
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
          exchangeRates.map((exchangeRate: ExchangeRateType | null) => {
            if (!exchangeRate) {
              return <PrevExchangeRates charCode={charCode} key={charCode} />;
            }

            charCode = exchangeRate.CharCode;
            return (
              <ExchangeRate
                exchangeRateData={exchangeRate}
                key={exchangeRate.ID}
              />
            );
          })}
      </tbody>
    </table>
  );
}
