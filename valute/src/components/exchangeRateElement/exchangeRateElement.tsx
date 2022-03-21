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
  renderSomePreviousRates,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
  previousReqURL: string;
  renderSomePreviousRates: React.Dispatch<
    React.SetStateAction<IExchangeRateData[]>
  >;
}) {
  const classes = styles();

  const percentOfChange: number = calculatePercentOfChange(
    exchangeRateData.Value,
    exchangeRateData.Previous
  );

  const showPreviousRates = async () => {
    const countOfPreviousRates: IExchangeRateData[] | null =
      await getCountOfPreviousRates(
        COUNT_OF_PREVIOUS_RATES,
        0,
        previousReqURL,
        [],
        exchangeRateData.CharCode
      );

    if (countOfPreviousRates) {
      renderSomePreviousRates((state: IExchangeRateData[]) => {
        const index: number = state.indexOf(exchangeRateData);
        const newState: IExchangeRateData[] = insertionByIndex(
          state,
          countOfPreviousRates,
          index
        );
        return newState;
      });
    }
  };

  return (
    <tr
      title={exchangeRateData.Name}
      className={`${classes.exchangeRateElement} ${
        itemCounter % 2 !== 0 ? classes.grayBg : ""
      } ${
        exchangeRateData.isPrevious ? classes.exchangeRateElement_previous : ""
      }`}
      onClick={async () => showPreviousRates()}
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

function insertionByIndex(
  array: IExchangeRateData[],
  insertion: IExchangeRateData[],
  index: number
) {
  index += 1;
  const arrayStart: IExchangeRateData[] = array.slice(0, index);
  const arrayEnd: IExchangeRateData[] = array.slice(index);
  return [...arrayStart, ...insertion, ...arrayEnd];
}
