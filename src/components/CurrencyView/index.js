import { useDispatch, useSelector } from 'react-redux';
import ModalSelect from '../ModalSelect';
import styles from './CurrencyView.module.css';
import { setBase, setTarget } from '../../store/actions/rates';

function CurrencyView({
  ticker, placeholder, onValueChange, value,
}) {
  const symbols = useSelector((state) => state.symbols.symbols);
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
        <ModalSelect
          className={styles.select}
          onChange={onTickerChange}
          symbols={symbols}
          value={ticker}
        />
      </div>
      <div className={styles.amountContainer}>
        {placeholder === '' && (
        <input
          type="text"
          readOnly
          value={value}
          className={styles.input}
        />
        )}
        {placeholder !== '' && (
        <input
          type="number"
          placeholder={placeholder}
          onChange={handleChange}
          className={styles.input}
        />
        )}
      </div>
    </div>
  );
}

export default CurrencyView;
