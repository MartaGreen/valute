import React from "react";
import styles from "./exchangeRateElement.style";
import { IExchangeRateData } from "../../interfaces/exchangeRatesInterfaces";
import {
  calculatePercentOfChange,
  getCountOfPreviousRates,
} from "../../serverData/exchangeRatesDataRequest";
import { COUNT_OF_PREVIOUS_RATES } from "../../constants/requestsConstants";

import PercentOfChangeIcon from "./percentOfChangeIcon/percentOfChangeIcon";
import { useEffect } from "react";

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

  const getPreviousRates = async () => {
    const countOfPreviousRates: IExchangeRateData[] =
      await getCountOfPreviousRates(
        COUNT_OF_PREVIOUS_RATES,
        0,
        previousReqURL,
        [],
        exchangeRateData.CharCode
      );

    console.log(countOfPreviousRates);
  };

  return (
    <tr
      title={exchangeRateData.Name}
      className={`${classes.exchangeRateElement} ${
        itemCounter % 2 !== 0 ? classes.grayBg : ""
      }`}
      onClick={async () => getPreviousRates()}
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
