import React from "react";
import styles from "./exchangeRateElement.style";
import {
  IExchangeRateData,
  IPercentOfChangeObj,
} from "../../interfaces/exchangeRatesInterfaces";
import { calculatePercentOfChange } from "../../serverData/exchangeRatesDataRequest";

import PercentOfChangeIcon from "./percentOfChangeIcon/percentOfChangeIcon";

export default function ExhangeRateElement({
  exchangeRateData,
  itemCounter,
  previousReqURL,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
  previousReqURL: string;
}) {
  const classes = styles();

  const percentOfChange: number = calculatePercentOfChange(
    exchangeRateData.Value,
    exchangeRateData.Previous
  );

  return (
    <tr
      title={exchangeRateData.Name}
      className={`${classes.exchangeRateElement} ${
        itemCounter % 2 !== 0 ? classes.grayBg : ""
      }`}
    >
      <th
        className={classes.exchangeRateElement__column}
      >{`${exchangeRateData.NumCode} ${exchangeRateData.CharCode}`}</th>
      <th className={classes.exchangeRateElement__column}>
        {exchangeRateData.Value}
      </th>
      <th
        className={`${classes.exchangeRateElement__column} ${classes.exchangeRateElement__percOfChange}`}
      >
        <PercentOfChangeIcon isIncrease={percentOfChange > 0} />
        {percentOfChange}
      </th>
    </tr>
  );
}
