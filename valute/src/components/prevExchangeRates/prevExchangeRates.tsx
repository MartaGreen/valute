import React from "react";
import { useSelector } from "react-redux";
import { PrevExchangeRateStateType } from "../../types/exchange-rates.types";
import { ExchangeRateType } from "../../types/exchange-rates.types";

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
