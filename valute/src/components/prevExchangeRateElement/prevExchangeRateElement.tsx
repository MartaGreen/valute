import React from "react";
import { IExchangeRateData } from "../../interfaces/exchangeRatesInterfaces";
import { calculatePercentOfChange } from "../../serverData/exchangeRatesDataRequest";
import PercentOfChangeIcon from "../exchangeRateElement/percentOfChangeIcon/percentOfChangeIcon";

export default function PrevExchangeRateElement({
  prevExchangeRate,
}: {
  prevExchangeRate: IExchangeRateData;
}) {
  const percentOfChange: number = calculatePercentOfChange(
    prevExchangeRate.Value,
    prevExchangeRate.Previous
  );

  return (
    <tr>
      <td>{`${prevExchangeRate.CharCode} ${prevExchangeRate.NumCode}`}</td>
      <td>{prevExchangeRate.Value}</td>
      <td>
        <PercentOfChangeIcon isIncrease={percentOfChange > 0} />
        {percentOfChange}
      </td>
    </tr>
  );
}
