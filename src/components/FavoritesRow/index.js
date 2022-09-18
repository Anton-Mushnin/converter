/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
// import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setBase, setTarget } from '../../store/actions/rates';
import styles from './FavoritesRow.module.css';
// import 'bootstrap/dist/css/bootstrap.css';

function FavoritesRow({ pair }) {
  const {
    base, target, today, yesterday,
  } = pair;

  const dispatch = useDispatch();

  const [formattedRate, setFormattedRate] = useState('');
  const handleClick = () => {
    dispatch(setBase(base));
    dispatch(setTarget(target));
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
        {today && (
        <>
          <div className={styles.trend}>
            <img
              className={styles.trendImg}
              id={`${base}${target}`}
              src={today > yesterday ? '/images/up.png' : '/images/down.png'}
              alt="trend"
            />
          </div>
          <div className={styles.rate}>{formattedRate}</div>
        </>
        )}
        {!today && <div className="spinner-border spinner-border-sm" />}
      </div>
    </div>
  );
}

export default FavoritesRow;
