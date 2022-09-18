import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Rate.module.css';

function Rate() {
  const { base, target, rate } = useSelector((state) => state.rates);
  const [baseString, setBaseString] = useState('');
  const [targetString, setTargetString] = useState('');

  useEffect(() => {
    const { locale } = Intl.NumberFormat().resolvedOptions();
    const nf = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: base,
      maximumFractionDigits: 0,
    });
    setBaseString(nf.format(1));
  }, [base]);

  useEffect(() => {
    const { locale } = Intl.NumberFormat().resolvedOptions();
    const nf = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: target,
    });
    setTargetString(nf.format(rate[target]));
  }, [target, rate]);

  return (
    <div className={styles.container}>
      <div>{baseString}</div>
      <div className={styles.sign}>=</div>
      {rate[target] && <div>{targetString}</div>}
      {!rate[target] && <div className="spinner-border spinner-border-sm" />}
    </div>
  );
}

export default Rate;
