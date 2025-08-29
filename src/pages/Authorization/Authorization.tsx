import { useForm, type SubmitHandler } from 'react-hook-form';

import styles from './Authorization.module.scss';

import { useAppDispatch } from '../../redux/store';
import { useGetMeQuery, useLoginMutation } from '../../features/api/authApi';
import { setUser } from '../../redux/slices/userSlice';

import { Link, useNavigate } from 'react-router-dom';

import { sha256 } from 'js-sha256';

import Cookies from 'js-cookie';

import arrow from '../../assets/img/arrow.svg';
import signIn from '../../assets/img/signInButton.svg';
import signInPhoto from '../../assets/img/signIn.png';

import type { User } from '../../@types/types';

export default function Authorization() {
  const [authUser, { isLoading, isError, error }] = useLoginMutation();
  const { refetch } = useGetMeQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<User>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<User> = async (obj) => {
    try {
      const activeUser = {
        username: obj.username,
        password_hash: sha256(obj.password_hash),
      };

      console.log('Sending data:', activeUser);

      const response = await authUser(activeUser).unwrap();
      console.log('Authorization response:', response);

      if (response.user) {
        Cookies.set('access_token', response.access, {
          expires: 1,
          path: '/',
          secure: window.location.protocol === 'https:',
          sameSite: 'strict',
        });

        dispatch(setUser({ name: response.user.name, email: response.user.email }));
        localStorage.setItem(
          'user',
          JSON.stringify({ name: response.user.name, email: response.user.email }),
        );
        await refetch();
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.swap}>
        <button onClick={() => navigate('/registration')} className={styles.swapButton}>
          <span>Sign up</span>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.blockLeft}>
          <div className={styles.title}>
            <span className={styles.titleReg}>SIGN IN</span>
            <span className={styles.titleText}>AND LET YOUR CREATIVITY RUN WILD</span>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="userName" className={styles.label}>
              <input
                id="userName"
                className={styles.input}
                placeholder="user name*"
                {...register('username', {
                  required: 'This field is required',
                })}
              />
              <span className={styles.errorInput}>
                {errors.username && String(errors.username.message)}
              </span>
            </label>
            <label htmlFor="password" className={styles.label}>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="password"
                {...register('password_hash', {
                  required: 'This field is required',
                })}
              />
              <span className={styles.errorInput}>
                {errors.password_hash && String(errors.password_hash.message)}
              </span>
            </label>

            <div className={styles.buttonsBottom}>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={styles.buttonSubmit}>
                <img src={signIn} alt="signIn" className={styles.buttonSubmitImg} />
              </button>
            </div>
          </form>
          <div className={styles.swapBottom}>
            <span className={styles.swapBottomText}>Already have an account?</span>
            <Link to="/registration" className={styles.swapBottomLink}>
              Sign up
            </Link>
          </div>
          <div className={styles.errorBlock}>
            {isError && (
              <span className={styles.errorMessage}>
                Authorization error:{' '}
                {error && 'data' in error
                  ? (error.data as { message?: string })?.message || 'Unknown error'
                  : 'Unknown error'}
              </span>
            )}
          </div>
        </div>
        <div className={styles.blockRight}>
          <img src={signInPhoto} alt="signUpPhoto" className={styles.picture} />
        </div>
      </div>
    </div>
  );
}
