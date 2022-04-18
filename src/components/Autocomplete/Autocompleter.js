import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRootModel } from '../../models/RootModel';
import selectStyles from './styles';

const defaultAdditional = {
  page: 0,
};

/**
 * @desc Input with autocomplete and pagination for searching users
 * @param {Object} value - selected user
 * @param {function} onChange
 * @returns {JSX.Element}
 */
const AutoCompleter = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState();
  const {
    users: { selectedUser },
    orders: { getUsers },
  } = useRootModel();

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const content = await getUsers(page, searchQuery);

    return {
      options: content.filter((item) => item.id !== selectedUser.id),
      hasMore: content.length >= 1,
      additional: {
        page: page + 1,
      },
    };
  };

  const handleInput = (text) => {
    const sliced = text
      .replace(/[^a-zA-ZÄäÖöÜüß'\s]|^\s+/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 50);
    setInputValue(sliced);
  };

  return (
    <div>
      <AsyncPaginate
        styles={selectStyles}
        inputValue={inputValue}
        onInputChange={handleInput}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        additional={defaultAdditional}
        value={value}
        placeholder='Aufträge weitergeben an'
        noOptionsMessage={() => 'Benutzer wurde nicht gefunden'}
        loadingMessage={() => '...Suche'}
        loadOptions={loadOptions}
        onChange={onChange}
      />
    </div>
  );
};

AutoCompleter.defaultProps = {
  value: null,
};

AutoCompleter.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default AutoCompleter;
