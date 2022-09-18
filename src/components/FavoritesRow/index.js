/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBase, setTarget } from '../../store/actions/rates';
import styles from './FavoritesRow.module.css';

function FavoritesRow({ pair }) {
  const {
    base, target, today, yesterday,
  } = pair;

  const dispatch = useDispatch();

  const [formattedRate, setFormattedRate] = useState('');
  const handleClick = () => {
    dispatch(setBase(base));
    dispatch(setTarget(target));
    // dispatch(setBase(e.target.id.slice(0, 3)));
    // dispatch(setTarget(e.target.id.slice(-3)));
  };

  useEffect(() => {
    const nf = new Intl.NumberFormat('en-US', {
      minimumSignificantDigits: 5,
      maximumSignificantDigits: 5,
    });
    setFormattedRate(nf.format(today));
  }, [today]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.tickers}>{`${base} - ${target}`}</div>
      <div className={styles.rateAndTrend}>
        <div className={styles.trend}>
          <img
            className={styles.trendImg}
            id={`${pair.base}${pair.target}`}
            src={today > yesterday ? '/images/up.png' : '/images/down.png'}
            alt="trend"
          />
        </div>
        <div className={styles.rate}>{formattedRate}</div>
      </div>
    </div>
  );
}

export default FavoritesRow;
