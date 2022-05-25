import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import DatePicker from "react-datepicker";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]); // for all currency available
  const [fromCurrency, setFromCurrency] = useState(); // from currency
  const [toCurrency, setToCurrency] = useState(); // to currency
  const [exchangeRate, setExchangeRate] = useState(); // rate between two currency
  const [amount, setAmount] = useState(""); // amount which you want to be converted
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [initialDate, setInitialDate] = useState(new Date());

  //Initializing the api ->
  // apiKey => fkXP6uAr5b1K6WKV5teKHnDYX1OzyK6W
  var myHeaders = new Headers();
  myHeaders.append("apikey", "fkXP6uAr5b1K6WKV5teKHnDYX1OzyK6W");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  // for fetching all currency
  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  // for fetching the value
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols=${toCurrency}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1 className="heading">Currency Convert</h1>
      {/* Trying to impliment date here but failed to do so  i was using DatePicker libery to do so. Date picker is not working so i have commented it.*/}
      {/* <DatePicker
        selected={initialDate}
        onChange={(date) => setInitialDate(date)}
        dateFormat="yyyy/MM/dd"
        maxDate={new Date()}
      /> */}
      <div className="main-content">
        {/* <input type="date" value={initialDate} onChange={setInitialDate} /> */}
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div style={{ textAlign: "center", fontSize: "5vw" }}>=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </>
  );
}

export default App;
