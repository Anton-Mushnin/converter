/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux';
import { reverse } from '../../store/actions/rates';

function ReverseButton() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(reverse());
  };
  return (
    <img src="/images/reverse.png" alt="reverse" onClick={handleClick} />
  );
}

export default ReverseButton;
