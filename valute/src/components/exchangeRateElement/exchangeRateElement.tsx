import React from "react";
import styles from "./exchangeRateElement.style";
import {
  IExchangeRateData,
  IExchangeRatesStore,
} from "../../interfaces/exchangeRatesInterfaces";
import { calculatePercentOfChange } from "../../serverData/exchangeRatesDataRequest";

import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import {
  getPreviousRatesRequest,
  setInsertionIndex,
} from "../../redux/slices/exchangeRatesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ExchangeRateElement({
  exchangeRateData,
  itemCounter,
}: {
  exchangeRateData: IExchangeRateData;
  itemCounter: number;
}) {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: IExchangeRatesStore }) => state.exchangeRates
  );
  const previousUrl = storeData.previousUrl;
  const exchangeRatesData: IExchangeRateData[] = storeData.exchangeRatesData;
  const insertionIndex: number = storeData.insertionIndex;
  const dispatch = useDispatch();

  const percentOfChange: number = calculatePercentOfChange(
    exchangeRateData.Value,
    exchangeRateData.Previous
  );

  const showPreviousRates = async () => {
    const index: number = exchangeRatesData.indexOf(exchangeRateData);
    dispatch(setInsertionIndex(index));

    if (index + 1 !== insertionIndex) {
      dispatch(
        getPreviousRatesRequest({
          previousUrl,
          charCode: exchangeRateData.CharCode,
        })
      );

      // dispatch(setInsertionIndex(index));
    }
    // } else {
    //   dispatch(setInsertionIndex(NaN));
    // }
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
      <td
        className={classes.exchangeRateElement__column}
      >{`${exchangeRateData.NumCode} ${exchangeRateData.CharCode}`}</td>
      <td className={classes.exchangeRateElement__column}>
        {exchangeRateData.Value}
      </td>
      <td
        className={`${classes.exchangeRateElement__column} ${classes.exchangeRateElement__percOfChange}`}
      >
        <PercentOfChangeIcon percentOfChange={percentOfChange} />
        {percentOfChange}
      </td>
    </tr>
  );
}
