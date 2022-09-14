/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import clm from 'country-locale-map';
import getSymbols from './store/actions/symbols';
// import logo from './logo.svg';
import './App.css';
import SelectCurrency from './components/SelectCurrency';

function App() {
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.symbols.tickers);
  const symbols = useSelector((state) => state.symbols.symbols);
  const loading = useSelector((state) => state.symbols.loading);
  const error = useSelector((state) => state.symbols.error);
  // const [selected, setSelected] = useState('USD');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('EUR');

  // const fullNames = useRef();
  // const success = useSelector((state) => state.symbols.success);

  useEffect(() => {
    // console.log(navigator.language.slice(-2));
    // console.log(Intl.DateTimeFormat().resolvedOptions().locale);
    setFrom(clm.getCurrencyByAlpha2(navigator.language.slice(-2)));
    // console.log(clm.getCurrencyByAlpha2(navigator.language.slice(-2)));
    if (!tickers.length) {
      dispatch(getSymbols());
      console.log('fetch');
    }
  }, []);

  const handleSelectFrom = (value) => {
    setFrom(value);
  };
  const handleSelectTo = (value) => {
    setTo(value);
  };
  const reverse = () => {

  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {tickers.length === 0 && !loading && <p>No symbols available!</p>}
      {error && !loading && <p>{error}</p>}
      {tickers.length && (
        <>
          <SelectCurrency value={from} onChange={handleSelectFrom} tickers={tickers} symbols={symbols} />
          <SelectCurrency value={to} onChange={handleSelectTo} tickers={tickers} symbols={symbols} />
          <button type="button" onClick={reverse}>Reverse</button>
        </>
      )}

    </>
  );
}

export default App;
