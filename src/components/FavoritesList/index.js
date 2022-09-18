import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRates } from '../../store/actions/favorites';
import FavoritesRow from '../FavoritesRow';
import styles from './FavoritesList.module.css';

function FavoritesList() {
  const { pairs, reload } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reload) { return; }
    const tickers = {};
    pairs.forEach((pair) => {
      tickers[pair.base] = true;
      tickers[pair.target] = true;
    });
    dispatch(getRates(Object.keys(tickers)));
  }, [pairs]);

  return (
    <>
      <img className={styles.label} src="/images/bookmark.png" alt="bookmarks" />
      <div className={styles.container}>
        {pairs.map((pair) => (
          <FavoritesRow key={pair.base + pair.target} pair={pair} />
        ))}
      </div>
    </>
  );
}

export default FavoritesList;
