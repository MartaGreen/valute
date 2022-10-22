import React, { useRef, useState } from "react";
import styles from "./exchangeRate.style";

import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import {
  prevExchangeRatesReducer,
  resetPrevRates,
  updateActiveExchangeRate,
} from "../../redux/slices/prev-exchange-rates.slice";
import { useDispatch, useSelector } from "react-redux";
import { EXCHANGE_RATE_CHANGE_COLOR } from "../../constants/exchange-rates.constants";

import WithExchangeRate from "../WithExchangeRate/WithExchangeRate";

function ExchangeRate({
  exchRateData,
  isGrayBg,
  percentOfChange,
  rate,
}: {
  exchRateData: ExchangeRateType;
  isGrayBg: boolean;
  percentOfChange: number;
  rate: number;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const classes = styles();

  const dataStore = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const prevReqUrl = dataStore.prevReqUrl;
  const charCode: string = exchRateData.CharCode;
  const dispatch = useDispatch();

  const exchangeRateElement: React.MutableRefObject<HTMLTableRowElement | null> =
    useRef(null);
  const showPreviousRates = async () => {
    if (isOpened) {
      dispatch(resetPrevRates());
      setIsOpened(false);
      return;
    }

    dispatch(updateActiveExchangeRate(charCode));
    dispatch(prevExchangeRatesReducer({ prevReqUrl, charCode }));

    // move to chosen currency
    setTimeout(
      () =>
        (exchangeRateElement.current as HTMLTableRowElement).scrollIntoView({
          behavior: "smooth",
        }),
      0
    );

    setIsOpened(true);
  };

  return (
    <tr
      className={`${classes.exchangeRateTable__tr}`}
      title={exchRateData.Name}
      style={{ background: `${isGrayBg && "#ebebeb"}` }}
      ref={exchangeRateElement}
      id={exchRateData.ID}
    >
      <td className={classes.exchangeRateTable__td}>
        {`${exchRateData.NumCode} ${exchRateData.CharCode}`}
      </td>
      <td className={classes.exchangeRateTable__td}>{rate}</td>
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

export default WithExchangeRate(ExchangeRate);
