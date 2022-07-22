import React from "react";
import { ExchangeRateType } from "../../types/exchange-rates.types";
import styles from "./prevExchangeRate.style";

import { calculatePercentOfChange } from "../../api/exchange-rates.request";

function PrevExchangeRate({ data }: { data: ExchangeRateType }) {
  const percentOfChange: number = calculatePercentOfChange(
    data.Value,
    data.Previous
  );
  return (
    <tr>
      <td>
        {data.NumCode} {data.CharCode}
      </td>
      <td>{data.Value}</td>
      <td style={{ color: `${percentOfChange > 0 ? "green" : "red"}` }}>
        {percentOfChange}
      </td>
    </tr>
  );
}

export default PrevExchangeRate;
