/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import Spinner from 'react-bootstrap/Spinner';
import clm from 'country-locale-map';
import getSymbols from './store/actions/symbols';
import getRate from './store/actions/rates';
// import logo from './logo.svg';
import './App.css';
import SelectCurrency from './components/SelectCurrency';
import FavoritesList from './components/FavoritesList';
import FavoriteButton from './components/FavoriteButton';

function App() {
  const dispatch = useDispatch();
  const rate = useSelector((state) => state.rates.rate);
  const tickers = useSelector((state) => state.symbols.tickers);
  const symbols = useSelector((state) => state.symbols.symbols);
  const loading = useSelector((state) => state.rates.loading);
  const error = useSelector((state) => state.symbols.error);
  const [base, setBase] = useState('');
  const [target, setTarget] = useState('EUR');
  const [baseAmount, setBaseAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    setBase(clm.getCurrencyByAlpha2(Intl.DateTimeFormat().resolvedOptions().locale.slice(-2)));
    // setFrom(clm.getCurrencyByAlpha2(navigator.language.slice(-2)));
    if (!tickers.length) {
      dispatch(getSymbols());
    }
  }, []);

  useEffect(() => {
    if (base && target && base === 'QQ') {
      dispatch(getRate(base, target));
    }
  }, [base, target]);

  const reverse = () => {
    const toCopy = target;
    setTarget(base);
    setBase(toCopy);
  };

  useEffect(() => {
    if (rate) {
      setTargetAmount(baseAmount * rate[target]);
    }
  }, [baseAmount, rate]);

  const changeBase = (e) => {
    setBaseAmount(e.target.value);
  };

  return (
    <>
      {/* {loading && <Spinner animation="grow">qq</Spinner>} */}
      {tickers.length === 0 && !loading && <p>No symbols available!</p>}
      {error && !loading && <p>{error}</p>}
      {tickers.length && (
        <>
          {/* <Spinner /> */}
          <SelectCurrency value={base} onChange={setBase} tickers={tickers} symbols={symbols} />
          <SelectCurrency value={target} onChange={setTarget} tickers={tickers} symbols={symbols} />
          <button type="button" onClick={reverse}>Reverse</button>
          <input type="number" value={baseAmount} onChange={changeBase} />
          {rate && <p>{rate[target]}</p>}
          <div>{targetAmount}</div>
          <FavoriteButton base={base} target={target} />
        </>
      )}
      <FavoritesList />

    </>
  );
}

export default App;
