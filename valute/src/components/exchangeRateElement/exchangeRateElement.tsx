import React from "react";
import styles from "./exchangeRateElement.style";
import {
  IExchangeRateData,
  IPercentOfChangeObj,
} from "../../interfaces/exchangeRatesInterfaces";

import PercentOfChangeIcon from "./percentOfChangeIcon/percentOfChangeIcon";

export default function ExhangeRateElement({
  exchangeRateData,
  itemCounter,
  percentOfChange,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
  percentOfChange: number;
}) {
  const classes = styles();

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
