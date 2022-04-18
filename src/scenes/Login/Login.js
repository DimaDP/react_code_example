import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import styles from './Login.module.scss';
import showPassword from '../../assets/images/fa-solid_eye-1.svg';
import hidePassword from '../../assets/images/fa-solid_eye.svg';
import Checkbox from '../../components/Checkbox/Checkbox';
import { useRootModel } from '../../models/RootModel';
import errorIcon from '../../assets/images/cancel_24px.svg';
import logoIcon from '../../assets/images/logo_lg.svg';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { auth } = useRootModel();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN')) {
      auth.setIsAuthenticated(true);
    }
  }, []);

  const handleEmail = (e) => {
    auth.setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    auth.setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.login();
    setLoading(false);
  };

  const handleShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const isDisabledSubmit = auth.email && auth.password;

  const inputStyles = classNames({
    [styles.form_input]: true,
    [styles['form_input-error']]: auth.alert,
  });

  return (
    <div className={styles.form_container}>
      {isLoading && <Loader />}
      <div className={styles.form_content}>
        <div className={styles.form_title}>
          <img src={logoIcon} alt='BMS logo' />
        </div>
        <div className={styles.form_text}>Melden Sie sich bei Ihrem Konto an, um fortzufahren</div>
        <form className={styles.form}>
          <div className={styles.form_fields}>
            <label htmlFor='login' className={styles.form_label}>
              Login
            </label>
            <input
              className={inputStyles}
              id='login'
              type='text'
              value={auth.email}
              placeholder='Geben Sie Ihr Login ein'
              onChange={handleEmail}
            />
          </div>

          <div className={styles.form_fields}>
            <label className={styles.form_label} htmlFor='pass'>
              Passwort
            </label>
            <input
              className={inputStyles}
              id='pass'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='Geben Sie Ihr Passwort ein'
              value={auth.password}
              onChange={handlePassword}
            />
            <img
              role='presentation'
              className={styles.form_image}
              src={isPasswordVisible ? hidePassword : showPassword}
              alt='show_password'
              onClick={handleShowPassword}
            />
          </div>
          <div className={styles.form_error} style={{ maxHeight: auth.alert ? '300px' : 0 }}>
            <img
              role='presentation'
              src={errorIcon}
              alt='Error'
              className={styles.form_error_image}
              onClick={auth.clearAlert}
            />
            <span>Fehler: Falsche E-Mail oder Passwort /Benutzer existiert nicht</span>
          </div>
          <div>
            <Checkbox checked={auth.isRemember} setChecked={auth.setRememberMe} />
          </div>
          <button type='submit' className={styles.form_button} onClick={handleSubmit} disabled={!isDisabledSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default observer(Login);
