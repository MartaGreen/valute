import React from "react";
import styles from "./exchangeRateElement.style";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../api/exchange-rates.request";

import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import {
  prevExchangeRatesReducer,
  setInsertionIndex,
} from "../../redux/slices/exchange-rate.slice";
import { useDispatch, useSelector } from "react-redux";

export default function ExchangeRateElement({
  exchangeRateData,
  itemCounter,
}: {
  exchangeRateData: ExchangeRateType;
  itemCounter: number;
}) {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const prevReqUrl = storeData.prevReqUrl;
  const exchangeRatesData: ExchangeRateType[] = storeData.exchangeRates;
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
        prevExchangeRatesReducer({
          prevReqUrl,
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
