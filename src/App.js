/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import clm from 'country-locale-map';
import getSymbols from './store/actions/symbols';
import './App.css';
import FavoritesList from './components/FavoritesList';
import Currencies from './components/Currencies';
import { setBase, setTarget } from './store/actions/rates';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.symbols.tickers);

  useEffect(() => {
    if (!tickers.length) {
      dispatch(getSymbols());
    }
    const local = clm.getCurrencyByAlpha2(Intl.DateTimeFormat().resolvedOptions().locale.slice(-2));
    dispatch(setBase(local));
    dispatch(setTarget(local === 'USD' ? 'EUR' : 'USD'));
  }, []);

  return (
    <>
      <Header title="currency converter" />
      <Currencies />
      <FavoritesList />
    </>
  );
}

export default App;
