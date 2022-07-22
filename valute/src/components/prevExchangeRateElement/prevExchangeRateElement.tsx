import React from "react";
import { ExchangeRateType } from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../api/exchange-rates.request";
import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import styles from "./prevExchangeRateElement.style";

export default function PrevExchangeRateElement({
  prevExchangeRate,
}: {
  prevExchangeRate: ExchangeRateType;
}) {
  const classes = styles();

  const percentOfChange: number = calculatePercentOfChange(
    prevExchangeRate.Value,
    prevExchangeRate.Previous
  );

  return (
    <tr className={classes.prevRateLine} title={prevExchangeRate.Name}>
      <td
        className={classes.prevRateLine__td}
      >{`${prevExchangeRate.NumCode} ${prevExchangeRate.CharCode}`}</td>
      <td className={classes.prevRateLine__td}>{prevExchangeRate.Value}</td>
      <td className={classes.prevRateLine__td}>
        <PercentOfChangeIcon percentOfChange={percentOfChange} />
        {percentOfChange}
      </td>
    </tr>
  );
}
