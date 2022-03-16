import React from "react";
import styles from "./exchangeList.style";

export default function ExhangeRatesList() {
  const classes = styles();

  return (
    <table className={classes.exchangeRateList}>
      <thead>
        <tr>
          <th className={classes.exchangeRateList__item}>Код валюты</th>
          <th className={classes.exchangeRateList__item}>Курс (руб)</th>
          <th className={classes.exchangeRateList__item}>
            Изменение курса (%)
          </th>
        </tr>
      </thead>
    </table>
  );
}
