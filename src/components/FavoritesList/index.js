import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRates } from '../../store/actions/favorites';

function FavoritesList() {
  const pairs = useSelector((state) => state.favorites.pairs);
  const reload = useSelector((state) => state.favorites.reload);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!reload) { return; }
    const tickers = [];
    pairs.forEach((pair) => {
      tickers.push(pair.base);
      tickers.push(pair.target);
    });
    dispatch(getRates(tickers));
  }, [pairs]);

  return (
    <>
      {pairs.map((pair) => (
        <div key={`${pair.base}${pair.target}`}>{`${pair.base} - ${pair.target} - ${pair.today} ${pair.today > pair.yesterday ? 'up' : 'down'}`}</div>
      ))}
    </>
  );
}

export default FavoritesList;
