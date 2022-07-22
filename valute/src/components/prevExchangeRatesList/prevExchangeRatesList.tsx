import React from "react";
import { useSelector } from "react-redux";
import {
  ExchangeRateType,
  ExchangeRateStateType,
} from "../../types/exchange-rates.types";
import styles from "./prevExchangeRateList.style";
import { REQUEST_STATUS } from "../../constants/request.constants";

import PrevExchangeRateElement from "../prevExchangeRateElement/prevExchangeRateElement";

export default function PrevExchangeRatesList() {
  // const classes = styles();
  // const storeData = useSelector(
  //   (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  // );
  // const prevExchangeRatesList = storeData.prevExchangeRates;
  // const status = storeData.prevReqStatus;
  // const waitMsg: string = storeData.waitMsg;
  // return (
  //   <tr>
  //     <td colSpan={3} style={{ textAlign: "center" }}>
  //       {status === REQUEST_STATUS.success ? (
  //         <table className={classes.prevRatesTable}>
  //           <thead>
  //             <tr>
  //               <th></th>
  //               <th></th>
  //               <th></th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {prevExchangeRatesList.map(
  //               (prevElem: ExchangeRateType, index: number) => (
  //                 <PrevExchangeRateElement
  //                   prevExchangeRate={prevElem}
  //                   key={`prevExchRate-${index}`}
  //                 />
  //               )
  //             )}
  //           </tbody>
  //         </table>
  //       ) : (
  //         waitMsg
  //       )}
  //     </td>
  //   </tr>
  // );
}
