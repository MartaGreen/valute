import React from "react";
import ReactTooltip from "react-tooltip";
import { IExchangeRateData } from "../../interfaces/exchangeRatesInterfaces";

export default function ExhangeRateElement({
  exchangeRateData,
}: {
  exchangeRateData: IExchangeRateData;
}) {
  return (
    <tr data-tip="test">
      <th>{`${exchangeRateData.NumCode} ${exchangeRateData.CharCode}`}</th>
      <th>{exchangeRateData.Value}</th>
      <th></th>
    </tr>
  );
}
