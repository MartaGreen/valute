import React, { useEffect, useState } from "react";
import styles from "./exchangeRatesList.style";
import { useDispatch, useSelector } from "react-redux";
import { exchangeRatesRequest } from "../../redux/slices/exchangeRatesSlice";

import { getExchangeRatesData } from "../../serverData/exchangeRatesDataRequest";
import { REQUEST_STATUS } from "../../constants/requestsConstants";
import {
  IExchangeRate,
  IExchangeRatesRequestData,
  IExchangeRateData,
  IExchangeRatesStore,
} from "../../interfaces/exchangeRatesInterfaces";

import ExchangeRateElement from "../exchangeRateElement/exchangeRateElement";

export default function ExhangeRatesList() {
  const classes = styles();

  const storeData = useSelector(
    (state: { exchangeRates: IExchangeRatesStore }) => state.exchangeRates
  );
  const status: string = storeData.status;
  const exchangeRatesData: IExchangeRateData[] = storeData.exchangeRatesData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exchangeRatesRequest());
  }, []);

  const [previousReqURL, setPreviousReqURL] = useState("");
  const [delIndex, setDelIndex] = useState(-1);

  // useEffect(() => {
  //   const getReqData = async () => {
  //     const exchangeRatesReqData: IExchangeRatesRequestData | null =
  //       await getExchangeRatesData(TODAY_REQUEST_URL);

  //     if (exchangeRatesReqData) {
  //       const exchangeRatesDataArray: IExchangeRateData[] = ObjectToArray(
  //         exchangeRatesReqData.Valute
  //       );
  //       setExhangeRatesData(exchangeRatesDataArray);

  //       const previousExchangeRatesURL = exchangeRatesReqData.PreviousURL;
  //       setPreviousReqURL(previousExchangeRatesURL);
  //       // const percentOfChangeObj = await getPercentOfChange(
  //       //   previousExchangeRatesURL,
  //       //   exchangeRatesDataArray
  //       // );
  //       // setPercentOfChange(percentOfChangeObj);
  //     }
  //   };

  //   getReqData().catch((err) =>
  //     console.log("error occurred while getting data in useEffect", err)
  //   );
  // }, []);

  return (
    <table className={classes.exchangeRateList}>
      <thead className={classes.exchangeRateList__header}>
        <tr>
          <th className={classes.exchangeRateList__item}>Код валюты</th>
          <th className={classes.exchangeRateList__item}>Курс (руб)</th>
          <th className={classes.exchangeRateList__item}>
            Изменение курса (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {status === REQUEST_STATUS.pending ? (
          <tr>
            <td colSpan={3}>Loading ...</td>
          </tr>
        ) : (
          exchangeRatesData.map(
            (exchangeRate: IExchangeRateData, index: number) => (
              <ExchangeRateElement
                exchangeRateData={exchangeRate}
                itemCounter={index}
                key={`exch_rate-${index}`}
              />
            )
          )
        )}
      </tbody>
    </table>
  );
}
