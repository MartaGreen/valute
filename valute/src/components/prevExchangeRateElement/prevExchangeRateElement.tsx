import React from "react";
import { IExchangeRateData } from "../../interfaces/exchangeRatesInterfaces";
import { calculatePercentOfChange } from "../../serverData/exchangeRatesDataRequest";
import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import styles from "./prevExchangeRateElement.style";

export default function PrevExchangeRateElement({
  prevExchangeRate,
}: {
  prevExchangeRate: IExchangeRateData;
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
      >{`${prevExchangeRate.CharCode} ${prevExchangeRate.NumCode}`}</td>
      <td className={classes.prevRateLine__td}>{prevExchangeRate.Value}</td>
      <td className={classes.prevRateLine__td}>
        <PercentOfChangeIcon percentOfChange={percentOfChange} />
        {percentOfChange}
      </td>
    </tr>
  );
}
