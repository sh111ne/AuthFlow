import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';

import styles from './Home.module.scss';

import signUp from '../../assets/img/signUpButton.svg';
import signIn from '../../assets/img/signInButton.svg';

import { useEffect } from 'react';

import { useGetMeQuery } from '../../features/api/authApi';

export default function Home() {
  const { user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [data, isSuccess, dispatch]);

  console.log(user);
  return (
    <div className={styles.content}>
      <Link to="/registration">
        <img src={signUp} alt="singUp" className={styles.sign} />
      </Link>
      <Link to="/authorization">
        <img src={signIn} alt="singIn" className={styles.sign} />
      </Link>
      {error ? (
        <div className={styles.errorAccount}>Error getting profile</div>
      ) : (
        <div className={styles.account}>
          <span className={styles.accountData}>
            user name:{' '}
            <span className={styles.accountDataValue}>{isLoading ? 'Loading' : user.name}</span>
          </span>
          <span className={styles.accountData}>
            email:{' '}
            <span className={styles.accountDataValue}>{isLoading ? 'Loading' : user.email}</span>
          </span>
        </div>
      )}
    </div>
  );
}
