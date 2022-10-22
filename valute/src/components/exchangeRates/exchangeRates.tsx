import React, { useEffect } from "react";
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
import Loading from "../loading/loading";

export default function ExchangeRates() {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const status: string = storeData.status;
  const exchangeRates: ExchangeRateType[] = storeData.exchangeRates;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exchangeRatesReducer());
  }, []);

  return (
    <table className={classes.exchangeRatesTable}>
      <thead className={classes.exchangeRatesTable__header}>
        <tr>
          <th className={classes.exchangeRatesTable__th}>Code</th>
          <th className={classes.exchangeRatesTable__th}>Exchange rate</th>
          <th className={classes.exchangeRatesTable__th}>Change (%)</th>
        </tr>
      </thead>

      <tbody>
        <Loading status={status} />

        {status === REQUEST_STATUS.success &&
          exchangeRates.map((exchangeRate: ExchangeRateType, index: number) => (
            <>
              <ExchangeRate
                exchRateData={exchangeRate}
                key={exchangeRate.ID}
                isGrayBg={index % 2 !== 0}
              />
              <PrevExchangeRates
                charCode={exchangeRate.CharCode}
                key={exchangeRate.CharCode}
                name={exchangeRates[index - 1]?.Name}
              />
            </>
          ))}
      </tbody>
    </table>
  );
}
