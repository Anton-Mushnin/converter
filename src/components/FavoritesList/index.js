import { useSelector } from 'react-redux';

function FavoritesList() {
  const pairs = useSelector((state) => state.favorites.pairs);

  return (
    <>
      {pairs.map((pair) => (
        <div key={`${pair.base}${pair.target}`}>{`${pair.base} - ${pair.target}`}</div>
      ))}
    </>
  );
}

export default FavoritesList;
