import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './Filters.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import { useRootModel } from '../../models/RootModel';
import SearchInput from '../SearchInput/SearchInput';

/**
 * @desc Container for users search filters
 * @returns {JSX.Element}
 */
const Filters = () => {
  const {
    companies: { companies, getCompanies },
    users: { companyFilter, setCompanyFilter, nameFilter, setNameFilter },
  } = useRootModel();

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className={styles.container}>
      <Dropdown items={companies} selected={companyFilter} setSelected={setCompanyFilter} />
      <SearchInput setValue={setNameFilter} value={nameFilter} />
    </div>
  );
};

export default observer(Filters);
