import styles from './Loader.module.scss';

/**
 * @desc Loader UI
 * @returns {JSX.Element}
 */
const Loader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
