import searchIcon from '../../assets/images/Search.svg';

const selectStyles = {
  option: (base, state) => {
    return {
      ...base,
      state,
      padding: '16px',
    };
  },
  dropdownIndicator: () => {
    return { display: 'none' };
  },
  control: (base) => ({
    ...base,
    borderRadius: '10px',
    border: '1px solid #E4E4E4',
    boxShadow: 'none',
    background: '#fff',
    padding: '0px 30px',
    backgroundImage: `url(${searchIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px center',
  }),
  input: (base) => {
    return {
      ...base,
      width: '250px',
      height: '44px',
      borderRadius: '10px',
      boxShadow: 'none',
      border: 'none',
    };
  },
  container: (base) => {
    return {
      ...base,
      width: '260px',
      borderRadius: '10px',
      backgroundColor: '#fff',
    };
  },
  singleValue: (base) => ({
    ...base,
    zIndex: '100',
  }),
  indicatorSeparator: () => {
    return {
      display: 'none',
    };
  },
  placeholder: (base) => ({
    ...base,
  }),
  menu: (base) => ({
    ...base,
    padding: '10px',
    direction: 'rtl',
    borderRadius: '10px',
    boxShadow: 'none',
    border: '1px solid #E4E4E4',
    position: 'relative',
    zIndex: 1000,
  }),
  menuList: (base) => ({
    ...base,
    position: 'relative',
    zIndex: 1000,
    padding: '0px 10px',
    textAlign: 'left',
    scrollbarColor: '#439FFE #E5E6E7!important', // Firefox support
    scrollbarWidth: 'thin!important', // Firefox support
    '::-webkit-scrollbar': {
      width: '4px',
    },
    '::-webkit-scrollbar-track:': {
      background: 'grey',
      borderRadius: '10px;',
      margin: '10px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#439FFE',
      borderRadius: '5px',
      maxHeight: '10px',
    },
    maxHeight: '90px',
  }),
};

export default selectStyles;
