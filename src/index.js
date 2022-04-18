import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import setupAxiosInterceptors from './config/axios-interceptors';
import { clearStore } from './models/RootModel';

setupAxiosInterceptors(() => clearStore());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
