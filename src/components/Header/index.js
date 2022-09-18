import styles from './Header.module.css';

function Header({ title }) {
  return (
    <div className={styles.title}>{title}</div>
  );
}

export default Header;
