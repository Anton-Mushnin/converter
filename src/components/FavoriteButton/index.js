import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPair, removePair } from '../../store/actions/favorites';

function FavoriteButton({ base, target }) {
  const pairs = useSelector((state) => state.favorites.pairs);
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
    if (on) {
      dispatch(removePair(base, target));
      setOn(false);
    } else {
      dispatch(addPair(base, target));
      setOn(true);
    }
  };

  return (
    <button type="button" onClick={toggle}>{on ? 'on' : 'off'}</button>
  );
}

export default FavoriteButton;
