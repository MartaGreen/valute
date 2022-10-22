import React from "react";
import styles from "./prevExchangeRate.style";

import { ExchangeRateType } from "../../types/exchange-rates.types";
import { EXCHANGE_RATE_CHANGE_COLOR } from "../../constants/exchange-rates.constants";

import WithExchangeRate from "../WithExchangeRate/WithExchangeRate";
import formatDate from "../../shared/formateDate";

function PrevExchangeRate({
  exchRateData,
  percentOfChange,
  rate,
}: {
  exchRateData: ExchangeRateType;
  percentOfChange: number;
  rate: number;
}) {
  const classes = styles();
  const date = formatDate(exchRateData.Date);

  console.log(exchRateData);

  return (
    <tr className={classes.prevRatesTable__tr}>
      <td className={classes.prevRatesTable__td}>{date}</td>
      <td className={classes.prevRatesTable__td}>{rate}</td>
      <td
        style={{
          color: `${
            percentOfChange > 0
              ? EXCHANGE_RATE_CHANGE_COLOR.increase
              : EXCHANGE_RATE_CHANGE_COLOR.decrease
          }`,
        }}
        className={classes.prevRatesTable__td}
      >
        {percentOfChange}
      </td>
    </tr>
  );
}

export default WithExchangeRate(PrevExchangeRate);
