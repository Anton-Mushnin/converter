/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import getSymbols from './store/actions/symbols';
import './App.css';
// import SelectCurrency from './components/SelectCurrency';
import FavoritesList from './components/FavoritesList';
import Currencies from './components/Currencies';
import { setBase, setTarget } from './store/actions/rates';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  // const rate = useSelector((state) => state.rates.rate);
  const tickers = useSelector((state) => state.symbols.tickers);
  // const symbols = useSelector((state) => state.symbols.symbols);
  // const loading = useSelector((state) => state.favorites.loading);
  // const error = useSelector((state) => state.symbols.error);
  // const [base, setBase] = useState('');
  // const [target, setTarget] = useState('EUR');
  // const [baseAmount, setBaseAmount] = useState('');
  // const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    // setBase(clm.getCurrencyByAlpha2(Intl.DateTimeFormat().resolvedOptions().locale.slice(-2)));
    // setBase(clm.getCurrencyByAlpha2(navigator.language.slice(-2)));
    if (!tickers.length) {
      dispatch(getSymbols());
    }
    dispatch(setBase('USD'));
    dispatch(setTarget('EUR'));
  }, []);

  // useEffect(() => {
  //   if (base && target && base === 'QQ') {
  //     dispatch(getRate(base, target));
  //   }
  // }, [base, target]);

  // const reverse = () => {
  //   const toCopy = target;
  //   setTarget(base);
  //   setBase(toCopy);
  // };

  // useEffect(() => {
  //   if (rate) {
  //     setTargetAmount(baseAmount * rate[target]);
  //   }
  // }, [baseAmount, rate, base, target]);

  // const favSelected = (newBase, newTarget) => {
  //   dispatch(setBase(newBase));
  //   dispatch(setTarget(newTarget));
  // };
  return (
    <>
      {/* {loading && <Spinner animation="grow">qq</Spinner>}
      {tickers.length === 0 && !loading && <p>No symbols available!</p>}
      {error && !loading && <p>{error}</p>}
      {tickers.length && (
        <>
          <CurrencyView ticker={base} currency={symbols[base]} onTickerChange={setBase} onValueChange={setBaseAmount} placeholder="enter amount" />
          <CurrencyView ticker={target} currency={symbols[target]} onTickerChange={setTarget} placeholder="" value={targetAmount} />
          <button type="button" onClick={reverse}>Reverse</button>
          {rate && <p>{rate[target]}</p>}
          <FavoriteButton base={base} target={target} />
        </>
      )} */}
      <Header title="currency converter" />
      <Currencies />
      <FavoritesList />

    </>
  );
}

export default App;
