import axios from 'axios';

const TIMEOUT = 0;
axios.defaults.timeout = TIMEOUT;

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      onUnauthenticated();
    }
    if (status === 403) {
      console.warn('error 403 access rights');
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
