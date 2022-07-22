import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ExchangeRateStateType } from "../../types/exchange-rates.types";

function PrevExchangeRates({ charCode }: { charCode: string }) {
  const [content, setContent] = useState([] as string[]);

  const storeData: ExchangeRateStateType = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const activeCharCode: string | null = storeData.activeExchangeRate;

  useEffect(() => {
    if (activeCharCode === charCode) {
      setContent(["test", "efhbqie", "dfvqb", "vhwbvbbb"]);
    } else {
      setContent([]);
    }
  }, [activeCharCode]);

  return (
    <tr>
      <table>
        <tbody>
          {content.map((cont) => (
            <tr key="">
              <td>{cont}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </tr>
  );
}

export default PrevExchangeRates;
