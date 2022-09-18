/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import ModalSelect from '../ModalSelect';
import styles from './CurrencyView.module.css';
import { setBase, setTarget } from '../../store/actions/rates';

function CurrencyView({
  ticker, placeholder, onValueChange, value,
}) {
  const symbols = useSelector((state) => state.symbols.symbols);
  const tickers = useSelector((state) => state.symbols.tickers);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  const onTickerChange = (selected) => {
    if (placeholder) {
      dispatch(setBase(selected));
    } else {
      dispatch(setTarget(selected));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.currencyContainer}>
        <div className={styles.name}>
          <div className={styles.ticker}>{ticker}</div>
          <div className={styles.currency}>{symbols[ticker]}</div>
        </div>
        <ModalSelect className={styles.select} onChange={onTickerChange} tickers={tickers} symbols={symbols} value={ticker} />
      </div>
      <div className={styles.amountContainer}>
        {placeholder === '' && <input type="number" readOnly value={value} />}
        {placeholder !== '' && <input type="number" placeholder={placeholder} onChange={handleChange} />}
      </div>
    </div>
  );
}

export default CurrencyView;
