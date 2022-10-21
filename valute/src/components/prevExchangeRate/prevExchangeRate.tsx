import React from "react";
import styles from "./prevExchangeRate.style";

import { ExchangeRateType } from "../../types/exchange-rates.types";
import { EXCHANGE_RATE_CHANGE_COLOR } from "../../constants/exchange-rates.constants";
import dateFormat, { masks } from "dateformat";

import WithExchangeRate from "../WithExchangeRate/WithExchangeRate";

function PrevExchangeRate({
  exchRateData,
  percentOfChange,
}: {
  exchRateData: ExchangeRateType;
  percentOfChange: number;
}) {
  const classes = styles();

  const getDate = () => {
    const dateStr: string | undefined = exchRateData.Date;
    if (!dateStr) return;

    const date: Date = new Date(dateStr);
    const formatedDate = dateFormat(date, "mmmm dS, yyyy");
    return formatedDate;
  };

  return (
    <tr className={classes.prevRatesTable__tr}>
      <td className={classes.prevRatesTable__td}>{getDate()}</td>
      <td className={classes.prevRatesTable__td}>{exchRateData.Value}</td>
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
