import React, { useState } from "react";
import styles from "./prevExchangeRates.style";
import { useSelector } from "react-redux";
import { PrevExchangeRateStateType } from "../../types/exchange-rates.types";
import { ExchangeRateType } from "../../types/exchange-rates.types";

import PrevExchangeRate from "../prevExchangeRate/prevExchangeRate";
import Loading from "../loading/loading";
import { REQUEST_STATUS } from "../../constants/request.constants";

function PrevExchangeRates({ charCode }: { charCode: string }) {
  const classes = styles();

  const storeData = useSelector(
    (state: { prevExchangeRates: PrevExchangeRateStateType }) =>
      state.prevExchangeRates
  );
  const activeCharCode: string | null = storeData.activeExchangeRate;
  const prevExchangeRates: ExchangeRateType[] = storeData.prevExchangeRates;
  const status: string = storeData.status;
  // const status = REQUEST_STATUS.pending;

  return (
    <tr>
      <td colSpan={3} className={classes.prevRatesContainer}>
        {activeCharCode === charCode && (
          <table className={classes.prevRatesTable}>
            <thead>
              <tr>
                <th colSpan={3}>Курс валюты за прошлые дни</th>
              </tr>
            </thead>
            <tbody>
              <Loading status={status} />

              {status === REQUEST_STATUS.success &&
                prevExchangeRates.map((prevExchangeRate: ExchangeRateType) => (
                  <PrevExchangeRate prevExchangeRateData={prevExchangeRate} />
                ))}
            </tbody>
          </table>
        )}
      </td>
    </tr>
  );
}

export default PrevExchangeRates;
