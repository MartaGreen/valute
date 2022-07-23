import React from "react";
import styles from "./prevExchangeRate.style";

import { ExchangeRateType } from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../shared/calculations";
import { EXCHANGE_RATE_CHANGE_COLOR } from "../../constants/exchange-rates.constants";

function PrevExchangeRate({
  prevExchangeRateData,
}: {
  prevExchangeRateData: ExchangeRateType;
}) {
  const classes = styles();

  const percentOfChange: number = calculatePercentOfChange(
    prevExchangeRateData.Value,
    prevExchangeRateData.Previous
  );

  return (
    <tr className={classes.prevRatesTable__tr}>
      <td className={classes.prevRatesTable__td}>
        {prevExchangeRateData.NumCode} {prevExchangeRateData.CharCode}
      </td>
      <td className={classes.prevRatesTable__td}>
        {prevExchangeRateData.Value}
      </td>
      <td
        style={{
          color: `${
            percentOfChange > 0
              ? EXCHANGE_RATE_CHANGE_COLOR.increase
              : EXCHANGE_RATE_CHANGE_COLOR.decrease
          }`,
        }}
        className={classes.prevRatesTable__td}
      >
        {percentOfChange}
      </td>
    </tr>
  );
}

export default PrevExchangeRate;
