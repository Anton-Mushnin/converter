// import styles from './SelectCurrency.module.css';
// import { useState } from 'react';

function SelectCurrency({
  value, onChange, tickers, symbols,
}) {
  // const [selected, setSelected] = useState(value);

  const handleSelect = (e) => {
    // setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <select value={value} onChange={handleSelect}>
        {tickers.map((ticker) => (
          <option key={ticker} value={ticker}>
            {symbols[ticker]}
          </option>
        ))}
      </select>
      <select value={value} onChange={handleSelect}>
        {tickers.map((ticker) => (
          <option key={ticker} value={ticker}>
            {ticker}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectCurrency;
