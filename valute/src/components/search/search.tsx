import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ExchangeRateStateType,
  ExchangeRateType,
} from "../../types/exchange-rates.types";
import styles from "./search.style";

function Search() {
  const [searchedString, setSearchedString] = useState("");
  const classes = styles();

  const exchRatesStore = useSelector(
    (state: { exchangeRates: ExchangeRateStateType }) => state.exchangeRates
  );
  const exchangeRates: (ExchangeRateType | null)[] =
    exchRatesStore.exchangeRates;

  const isStartsWith = (
    str: string | null | undefined,
    searchedStr: string
  ) => {
    return str?.toLowerCase().startsWith(searchedStr.toLowerCase());
  };
  const isIncludeSubstr = (
    str: string | null | undefined,
    searchedStr: string
  ) => {
    return str?.toLowerCase().includes(searchedStr.toLowerCase());
  };

  const onFindCurrency = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let foundExchangeRate = exchangeRates.filter(
      (rate) =>
        isStartsWith(rate?.NumCode, searchedString) ||
        isStartsWith(rate?.CharCode, searchedString) ||
        isStartsWith(rate?.Name, searchedString)
    )[0];

    if (!foundExchangeRate) {
      foundExchangeRate = exchangeRates.filter(
        (rate) =>
          isIncludeSubstr(rate?.NumCode, searchedString) ||
          isIncludeSubstr(rate?.CharCode, searchedString) ||
          isIncludeSubstr(rate?.Name, searchedString)
      )[0];
    }

    const findedExchRateID: string | undefined = foundExchangeRate?.ID;
    if (!findedExchRateID) return;

    const exchangeRateElement: HTMLElement | null =
      document.getElementById(findedExchRateID);
    if (!exchangeRateElement) return;

    setTimeout(() => {
      exchangeRateElement.scrollIntoView({
        behavior: "smooth",
      });
      exchangeRateElement.classList.add(classes.markerElement);
      setTimeout(
        () => exchangeRateElement.classList.remove(classes.markerElement),
        2800
      );
    }, 0);
  };

  const onSearchedStrChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedString(e.target.value);
  };

  return (
    <form className={classes.search} onSubmit={onFindCurrency}>
      <input
        type="text"
        placeholder="Enter currency name or code"
        className={classes.search__field}
        onChange={onSearchedStrChanged}
      />
      <button className={classes.search__btn}>find</button>
    </form>
  );
}

export default Search;
