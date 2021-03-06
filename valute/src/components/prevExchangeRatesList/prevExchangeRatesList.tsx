import React from "react";
import { useSelector } from "react-redux";
import {
  IExchangeRateData,
  IExchangeRatesStore,
} from "../../interfaces/exchangeRatesInterfaces";
import styles from "./prevExchangeRateList.style";
import { REQUEST_STATUS } from "../../constants/requestsConstants";

import PrevExchangeRateElement from "../prevExchangeRateElement/prevExchangeRateElement";

export default function PrevExchangeRatesList() {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: IExchangeRatesStore }) => state.exchangeRates
  );
  const prevExchangeRatesList = storeData.countOfPreviousRates;
  const status = storeData.prevRatesStatus;
  const waitMsg: string = storeData.waitMsg;

  return (
    <tr>
      <td colSpan={3} style={{ textAlign: "center" }}>
        {status === REQUEST_STATUS.success ? (
          <table className={classes.prevRatesTable}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prevExchangeRatesList.map(
                (prevElem: IExchangeRateData, index: number) => (
                  <PrevExchangeRateElement
                    prevExchangeRate={prevElem}
                    key={`prevExchRate-${index}`}
                  />
                )
              )}
            </tbody>
          </table>
        ) : (
          waitMsg
        )}
      </td>
    </tr>
  );
}
