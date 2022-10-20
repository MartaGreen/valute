import React from "react";
import { calculatePercentOfChange } from "../../shared/calculations";
import { ExchangeRateType } from "../../types/exchange-rates.types";

function WithExchangeRate(Component: React.ComponentType<any>) {
  return (props: { exchRateData: ExchangeRateType; isGrayBg?: boolean }) => {
    const percentOfChange: number = calculatePercentOfChange(
      props.exchRateData.Value,
      props.exchRateData.Previous
    );

    return <Component {...props} percentOfChange={percentOfChange} />;
  };
}

export default WithExchangeRate;
