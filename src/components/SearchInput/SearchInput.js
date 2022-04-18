import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import styles from './SearchInput.module.scss';
import DeleteButton from '../DeleteButton/DeleteButton';

/**
 * @desc Debounce input for searching users
 * @param {string} value - user's name
 * @param {function} setValue
 * @returns {JSX.Element}
 */
const SearchInput = ({ value, setValue }) => {
  const [current, setCurrent] = useState(value);

  const debounced = useDebouncedCallback((value) => {
    setValue(value.replace(/[^a-zA-ZÄäÖöÜüß'\s]|^\s+|\s+$/g, '').replace(/\s+/g, ' '));
  }, 250);

  const onChange = (e) => {
    setCurrent(e.target.value.replace(/[^a-zA-ZÄäÖöÜüß'\s]|^\s+/g, '').replace(/\s+/g, ' '));
    debounced(e.target.value);
  };

  const clearInput = () => {
    setCurrent('');
    setValue('');
  };

  return (
    <div className={styles.container}>
      <input value={current} onChange={onChange} className={styles.input} />
      {value && <DeleteButton onPress={clearInput} style={{ top: '14px', right: '22px' }} />}
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default SearchInput;
