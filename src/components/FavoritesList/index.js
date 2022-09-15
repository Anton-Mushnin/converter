import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRates } from '../../store/actions/favorites';

function FavoritesList({ onClick }) {
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

  const handleClick = (e) => {
    onClick(e.target.id.slice(0, 3), e.target.id.slice(-3));
  };

  return (
    <>
      {pairs.map((pair) => (
        <button id={`${pair.base}${pair.target}`} type="button" onClick={handleClick} key={`${pair.base}${pair.target}`}>{`${pair.base} - ${pair.target} - ${pair.today} ${pair.today > pair.yesterday ? 'up' : 'down'}`}</button>
      ))}
    </>
  );
}

export default FavoritesList;
