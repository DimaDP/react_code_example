import './App.scss';
import MainRouter from './routes/MainRouter';
import { rootStore, RootStoreContext } from './models/RootModel';

function App() {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <MainRouter />
    </RootStoreContext.Provider>
  );
}

export default App;
