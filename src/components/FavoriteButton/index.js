/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPair, removePair } from '../../store/actions/favorites';
import styles from './FavoriteButton.module.css';

function FavoriteButton() {
  const pairs = useSelector((state) => state.favorites.pairs);
  const base = useSelector((state) => state.rates.base);
  const target = useSelector((state) => state.rates.target);

  const [on, setOn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pairs.some((pair) => pair.base === base && pair.target === target)) {
      setOn(true);
    } else {
      setOn(false);
    }
  }, [base, target, pairs]);

  const toggle = () => {
    dispatch(on ? removePair(base, target) : addPair(base, target));
  };

  return (
    <img
      className={styles.button}
      src={on ? '/images/bookmark.png' : '/images/bookmark_off.png'}
      alt="fav"
      onClick={toggle}
    />
  );
}

export default FavoriteButton;
