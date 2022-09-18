import FavoriteButton from '../FavoriteButton';
import ReverseButton from '../ReverseButton';
import styles from './ButtonsBlock.module.css';

function ButtonsBlock() {
  return (
    <div className={styles.container}>
      <ReverseButton />
      <FavoriteButton />
    </div>
  );
}

export default ButtonsBlock;
