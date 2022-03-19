import React from "react";
import ReactTooltip from "react-tooltip";
import styles from "./exchangeRateElement.style";
import { IExchangeRateData } from "../../interfaces/exchangeRatesInterfaces";

export default function ExhangeRateElement({
  exchangeRateData,
  itemCounter,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
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
      <th className={classes.exchangeRateElement__column}></th>
    </tr>
  );
}
