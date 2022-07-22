import React from "react";
import { useSelector } from "react-redux";
import { PrevExchangeRateStateType } from "../../types/exchange-rates.types";
import { ExchangeRateType } from "../../types/exchange-rates.types";

import PrevExchangeRate from "../prevExchangeRate/prevExchangeRate";

function PrevExchangeRates({ charCode }: { charCode: string }) {
  const storeData = useSelector(
    (state: { prevExchangeRates: PrevExchangeRateStateType }) =>
      state.prevExchangeRates
  );
  const activeCharCode: string | null = storeData.activeExchangeRate;
  const prevExchangeRates: ExchangeRateType[] = storeData.prevExchangeRates;

  return (
    <tr>
      <td colSpan={3}>
        {activeCharCode === charCode && (
          <table>
            <thead>
              <tr>
                <th colSpan={3}>
                  <h3>Курс валюты за прошлые дни</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {prevExchangeRates.map((data: ExchangeRateType) => (
                <PrevExchangeRate data={data} />
              ))}
            </tbody>
          </table>
        )}
      </td>
    </tr>
  );
}

export default PrevExchangeRates;
