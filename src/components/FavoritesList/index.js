import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRates } from '../../store/actions/favorites';
import { setBase, setTarget } from '../../store/actions/rates';

function FavoritesList() {
  const pairs = useSelector((state) => state.favorites.pairs);
  const reload = useSelector((state) => state.favorites.reload);
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

  const handleClick = (e) => {
    dispatch(setBase(e.target.id.slice(0, 3)));
    dispatch(setTarget(e.target.id.slice(-3)));
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
