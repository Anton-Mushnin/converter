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
    if (rate) {
      const { locale } = Intl.NumberFormat().resolvedOptions();
      let nf;
      if (rate[target] > 1) {
        nf = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: target,
        });
      } else {
        nf = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: target,
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 2,
        });
      }

      setTargetString(nf.format(rate[target]));
    }
  }, [target, rate]);

  return (
    <div className={styles.container}>
      <div>{baseString}</div>
      <div className={styles.sign}>=</div>
      {rate && <div>{targetString}</div>}
      {!rate && <div className="spinner-border spinner-border-sm" />}
    </div>
  );
}

export default Rate;
