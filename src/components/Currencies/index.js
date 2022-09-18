import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyView from '../CurrencyView';
import { getRate } from '../../store/actions/rates';
import styles from './Currencies.module.css';
import ButtonsBlock from '../ButtonsBlock';
import Rate from '../Rate';

function Currencies() {
  const dispatch = useDispatch();

  const base = useSelector((state) => state.rates.base);
  const target = useSelector((state) => state.rates.target);
  const rate = useSelector((state) => state.rates.rate);
  const symbols = useSelector((state) => state.symbols.symbols);
  const [baseAmount, setBaseAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    if (rate[target] && baseAmount) {
      const { locale } = Intl.NumberFormat().resolvedOptions();
      const nf = new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setTargetAmount(nf.format(baseAmount * rate[target]));
      // setTargetAmount(baseAmount * rate[target]);
    } else {
      setTargetAmount('');
    }
  }, [baseAmount, rate, base, target]);

  useEffect(() => {
    if (base && target && base === 'QQ') {
      dispatch(getRate(base, target));
    }
  }, [base, target]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>From</div>
      <CurrencyView ticker={base} currency={symbols[base]} onValueChange={setBaseAmount} placeholder="enter amount" />
      <ButtonsBlock />
      <div className={styles.label}>To</div>
      <CurrencyView ticker={target} currency={symbols[target]} placeholder="" value={targetAmount} />
      <Rate />
    </div>
  );
}

export default Currencies;
