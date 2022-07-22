import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ExchangeRateStateType } from "../../types/exchange-rates.types";

import { prevExchangeRatesReducer } from "../../redux/slices/exchange-rate.slice";
import { ExchangeRateType } from "../../types/exchange-rates.types";

function PrevExchangeRates({ charCode }: { charCode: string }) {
  const storeData: ExchangeRateStateType = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const activeCharCode: string | null = storeData.activeExchangeRate;
  const prevExchangeRates = storeData.prevExchangeRates;

  return (
    <tr>
      <td colSpan={3}>
        {activeCharCode === charCode && (
          <table>
            <tbody>
              {prevExchangeRates.map((data: ExchangeRateType) => (
                <tr>
                  <td>
                    {data.NumCode} {data.CharCode}
                  </td>
                  <td>{data.Value}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </td>
    </tr>
  );
}

export default PrevExchangeRates;
