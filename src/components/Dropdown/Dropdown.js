import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';

/**
 * @desc Custom select
 * @param {Array} items - select items
 * @param {Object} selected - selected element
 * @param {function} setSelected
 * @returns {JSX.Element}
 */
const Dropdown = ({ items, selected, setSelected }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current?.contains(e.target) && e.target.id !== 'select' && e.target.parentNode.id !== 'select') {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const setCompany = (id) => {
    if (id === null) {
      setSelected(null);
    } else {
      setSelected(+id);
    }
    setOptionsVisible(false);
  };

  const setName = () => {
    if (selected) {
      return items.find((item) => +item.id === selected).name;
    }
    return 'Firma';
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSelectContainer}>
        <div
          role='presentation'
          id='select'
          className={styles.formSelect}
          style={{ border: isOptionsVisible ? '1px solid #439FFE' : '1px solid #CACACA' }}
          onClick={() => setOptionsVisible(!isOptionsVisible)}
        >
          <span className={styles.formText} style={{ color: !selected && '#848484' }}>
            {setName()}
          </span>
          <div className={styles.formArrow} style={{ transform: isOptionsVisible ? 'rotate(180deg)' : 'none' }} />
        </div>
        <div
          className={styles.container}
          style={{
            maxHeight: isOptionsVisible ? `${216}px` : '0px',
            border: isOptionsVisible ? '1px solid #CACACA ' : '1px solid #F5F5F5',
          }}
        >
          <div className={styles.optionsContainer} ref={myRef}>
            <div className={styles.formOptions} style={{ maxHeight: isOptionsVisible ? `${196}px` : '0px' }}>
              <div
                role='presentation'
                onClick={() => setCompany(null)}
                className={styles.formOption}
                style={{ color: '#848484' }}
              >
                Firma
              </div>
              {items.map((item) => (
                <div
                  role='presentation'
                  key={item.id}
                  className={styles.formOption}
                  onClick={() => setCompany(item.id)}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  selected: null,
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.number,
  setSelected: PropTypes.func.isRequired,
};

export default Dropdown;
