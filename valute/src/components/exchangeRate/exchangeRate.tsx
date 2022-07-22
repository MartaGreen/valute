import React, { useEffect } from "react";
import styles from "./exchangeRate.style";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../api/exchange-rates.request";

import PercentOfChangeIcon from "../percentOfChangeIcon/percentOfChangeIcon";
import {
  prevExchangeRatesReducer,
  openPrevExchangeRates,
} from "../../redux/slices/exchange-rate.slice";
import { useDispatch, useSelector } from "react-redux";

export default function ExchangeRate({
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
  const activeCharCode = storeData.activeExchangeRate;
  const charCode: string = exchangeRateData.CharCode;
  const dispatch = useDispatch();

  const percentOfChange: number = calculatePercentOfChange(
    exchangeRateData.Value,
    exchangeRateData.Previous
  );

  const showPreviousRates = async () => {
    if (charCode !== activeCharCode) {
      dispatch(prevExchangeRatesReducer({ prevReqUrl, charCode }));
      dispatch(openPrevExchangeRates(charCode));
    }
  };

  useEffect(() => {
    console.log(storeData);
  });

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
