import React from "react";
import { useSelector } from "react-redux";
import {
  IExchangeRateData,
  IExchangeRatesStore,
} from "../../interfaces/exchangeRatesInterfaces";

import PrevExchangeRateElement from "../prevExchangeRateElement/prevExchangeRateElement";

export default function PrevExchangeRatesList({}: {}) {
  const storeData = useSelector(
    (state: { exchangeRates: IExchangeRatesStore }) => state.exchangeRates
  );
  const prevExchangeRatesList = storeData.countOfPreviousRates;
  console.log(prevExchangeRatesList);

  return (
    <tr>
      <td colSpan={3}>
        <table>
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
      </td>
    </tr>
  );
}
