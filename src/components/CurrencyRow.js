import React from "react";

export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
}) {
  return (
    <div className="main">
      <h1 style={{ textAlign: "center" }}>{selectedCurrency}</h1>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
        height="20"
        style={{ fontSize: "25px", marginBottom: "10px" }}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
