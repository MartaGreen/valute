import React from "react";
import styles from "./exchangeRate.style";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../api/exchange-rates.request";

import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import { prevExchangeRatesReducer } from "../../redux/slices/prev-exchange-rates.slice";
import { useDispatch, useSelector } from "react-redux";

export default function ExchangeRate({
  exchangeRateData,
}: {
  exchangeRateData: ExchangeRateType;
}) {
  const classes = styles();

  const exchangeRatesStore = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );

  const prevReqUrl = exchangeRatesStore.prevReqUrl;
  const charCode: string = exchangeRateData.CharCode;
  const dispatch = useDispatch();

  const percentOfChange: number = calculatePercentOfChange(
    exchangeRateData.Value,
    exchangeRateData.Previous
  );

  const showPreviousRates = async () => {
    dispatch(prevExchangeRatesReducer({ prevReqUrl, charCode }));
  };

  return (
    <tr
      title={exchangeRateData.Name}
      className={`${classes.exchangeRateElement}`}
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
