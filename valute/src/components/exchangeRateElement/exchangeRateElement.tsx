import React from "react";
import styles from "./exchangeRateElement.style";
import {
  IExchangeRateData,
  IPercentOfChangeObj,
} from "../../interfaces/exchangeRatesInterfaces";

export default function ExhangeRateElement({
  exchangeRateData,
  itemCounter,
  percentOfChangeData,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
  percentOfChangeData: IPercentOfChangeObj;
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
      <th className={classes.exchangeRateElement__column}>
        {percentOfChangeData[exchangeRateData.CharCode]}
      </th>
    </tr>
  );
}
