import React from "react";
import { calculatePercentOfChange } from "../../shared/calculations";
import { ExchangeRateType } from "../../types/exchange-rates.types";
import exchangeRate from "../exchangeRate/exchangeRate";

function WithExchangeRate(Component: React.ComponentType<any>) {
  return (props: { exchRateData: ExchangeRateType; isGrayBg?: boolean }) => {
    const percentOfChange: number = calculatePercentOfChange(
      props.exchRateData.Value,
      props.exchRateData.Previous
    );

    const valuteRate = (
      props.exchRateData.Value / props.exchRateData.Nominal
    ).toFixed(4);

    return (
      <Component
        {...props}
        percentOfChange={percentOfChange}
        rate={valuteRate}
      />
    );
  };
}

export default WithExchangeRate;
