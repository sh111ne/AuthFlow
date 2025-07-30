import { useForm, type SubmitHandler } from 'react-hook-form';

import styles from './Authorization.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useLoginMutation } from '../../features/api/authApi';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';

type User = {
  username: string;
  password_hash: string;
};

export default function Authorization() {
  const [authUser, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
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
      console.log('Registration response:', response);

      if (response.user) {
        dispatch(setUser({ name: response.user.name, email: response.user.email }));
        localStorage.setItem(
          'user',
          JSON.stringify({ name: response.user.name, email: response.user.email }),
        );
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  console.log(user);

  return (
    <div className={styles.wrapper}>
      <div>
        {isError && (
          <div className={styles.errorMessage}>
            Ошибка регистрации:{' '}
            {error && 'data' in error
              ? (error.data as { message?: string })?.message || 'Неизвестная ошибка'
              : 'Неизвестная ошибка'}
          </div>
        )}
        <form className={styles.formInput} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userName" className={styles.labelText}>
            UserName
            <input
              id="userName"
              className={styles.input}
              placeholder="user name*"
              {...register('username', {
                required: 'Поле обязательно к заполнению',
              })}
            />
            <span className={styles.errorInput}>
              {errors.username && String(errors.username.message)}
            </span>
          </label>
          <label htmlFor="password" className={styles.labelText}>
            Пароль
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="Пароль"
              {...register('password_hash', {
                required: 'Поле обязательно к заполнению',
              })}
            />
            <span className={styles.errorInput}>
              {errors.password_hash && String(errors.password_hash.message)}
            </span>
          </label>

          <div className={styles.buttonsBottom}>
            <input
              type="submit"
              disabled={!isValid || isLoading}
              className={styles.buttonSubmit}
              value={isLoading ? 'Отправка...' : 'Авторизация'}
            />
          </div>
        </form>
      </div>
      <div>Картинка</div>
    </div>
  );
}
