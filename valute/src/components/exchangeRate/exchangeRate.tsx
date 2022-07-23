import React from "react";
import styles from "./exchangeRate.style";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import { calculatePercentOfChange } from "../../shared/calculations";
import {
  prevExchangeRatesReducer,
  updateActiveExchangeRate,
} from "../../redux/slices/prev-exchange-rates.slice";
import { useDispatch, useSelector } from "react-redux";
import { EXCHANGE_RATE_CHANGE_COLOR } from "../../constants/exchange-rates.constants";

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
    dispatch(updateActiveExchangeRate(charCode));
    dispatch(prevExchangeRatesReducer({ prevReqUrl, charCode }));
  };

  return (
    <tr
      className={`${classes.exchangeRateTable__tr}`}
      title={exchangeRateData.Name}
    >
      <td className={classes.exchangeRateTable__td}>
        {`${exchangeRateData.NumCode} ${exchangeRateData.CharCode}`}
      </td>
      <td className={classes.exchangeRateTable__td}>
        {exchangeRateData.Value}
      </td>
      <td
        className={`${classes.exchangeRateTable__td} ${classes.exchangeRateTable__change}`}
        style={{
          color: `${
            percentOfChange > 0
              ? EXCHANGE_RATE_CHANGE_COLOR.increase
              : EXCHANGE_RATE_CHANGE_COLOR.decrease
          }`,
        }}
      >
        {percentOfChange}

        <button
          className={classes.exchangeRateTable__showBtn}
          onClick={async () => showPreviousRates()}
        ></button>
      </td>
    </tr>
  );
}
