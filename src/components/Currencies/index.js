import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteButton from '../FavoriteButton';
import CurrencyView from '../CurrencyView';
import { getRate } from '../../store/actions/rates';
import ReverseButton from '../ReverseButton';
import styles from './Currencies.module.css';

function Currencies() {
  const dispatch = useDispatch();

  const base = useSelector((state) => state.rates.base);
  const target = useSelector((state) => state.rates.target);
  const rate = useSelector((state) => state.rates.rate);
  const symbols = useSelector((state) => state.symbols.symbols);
  const [baseAmount, setBaseAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    if (rate) {
      setTargetAmount(baseAmount * rate[target]);
    }
  }, [baseAmount, rate, base, target]);

  useEffect(() => {
    if (base && target && base === 'QQ') {
      dispatch(getRate(base, target));
    }
  }, [base, target]);

  return (
    <div className="container">
      <div className={styles.label}>From</div>
      <CurrencyView ticker={base} currency={symbols[base]} onValueChange={setBaseAmount} placeholder="enter amount" />
      <div className={styles.label}>To</div>
      <CurrencyView ticker={target} currency={symbols[target]} placeholder="" value={targetAmount} />
      <ReverseButton />
      {rate && <p>{rate[target]}</p>}
      <FavoriteButton base={base} target={target} />
    </div>
  );
}

export default Currencies;
