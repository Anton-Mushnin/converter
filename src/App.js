import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import getSymbols from './store/actions/symbols';
// import logo from './logo.svg';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.symbols.tickers);
  const symbols = useSelector((state) => state.symbols.symbols);
  const loading = useSelector((state) => state.symbols.loading);
  const error = useSelector((state) => state.symbols.error);
  const [selected, setSelected] = useState('USD');

  // const fullNames = useRef();
  // const success = useSelector((state) => state.symbols.success);

  useEffect(() => {
    if (!tickers.length) {
      dispatch(getSymbols());
      console.log('fetch');
    }
  }, []);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {tickers.length === 0 && !loading && <p>No symbols available!</p>}
      {error && !loading && <p>{error}</p>}
      {tickers.length && (
        <div>
          <select value={selected} onChange={handleSelect}>
            {tickers.map((ticker) => (
              <option key={ticker} value={ticker}>
                {symbols[ticker]}
              </option>
            ))}
          </select>
          <select value={selected} onChange={handleSelect}>
            {tickers.map((ticker) => (
              <option key={ticker} value={ticker}>
                {ticker}
              </option>
            ))}
          </select>
        </div>
      )}

    </>
  );
}

export default App;
