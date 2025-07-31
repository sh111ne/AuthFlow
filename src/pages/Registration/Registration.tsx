import { reEmail } from '../../shared/constants';

import { useForm, type SubmitHandler } from 'react-hook-form';

import styles from './Registration.module.scss';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useRegisterMutation } from '../../features/api/authApi';
import { setUser } from '../../redux/slices/userSlice';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import arrow from '../../assets/img/arrow.svg';
import signUp from '../../assets/img/signUpButton.svg';
import signUpPhoto from '../../assets/img/signUp.png';

type NewUser = {
  userName: string;
  email: string;
  password: string;
  repeat?: string;
  politic?: boolean;
  subscription?: boolean;
};

export default function Registration() {
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setValue,
    trigger,
  } = useForm<NewUser>({
    mode: 'onBlur',
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('politic', e.target.checked);
    trigger('politic');
  };

  const onSubmit: SubmitHandler<NewUser> = async (user) => {
    try {
      const newUser = {
        name: user.userName,
        password: user.password,
        email: user.email,
        mailing_agree: user.subscription ? 1 : 0,
      };

      console.log('Sending data:', newUser);

      const response = await registerUser(newUser).unwrap();
      console.log('Registration response:', response);

      if (response.message && response.message.includes('registered successfully')) {
        dispatch(
          setUser({
            name: user.userName,
            email: user.email,
            // isVerified: false,
          }),
        );
        localStorage.setItem('user', JSON.stringify({ name: user.userName, email: user.email }));
        navigate('/');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      if (err instanceof Object && 'data' in err) {
        console.error('Server error details:', err.data);
      }
    }
  };

  console.log(user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.swap}>
        <button onClick={() => navigate('/authorization')} className={styles.swapButton}>
          <span>Sign in</span>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.blockLeft}>
          <div className={styles.title}>
            <span className={styles.titleReg}>SIGN UP</span>
            <span className={styles.titleText}>AND LET YOUR CREATIVITY RUN WILD</span>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="userName" className={styles.label}>
              <input
                id="userName"
                className={styles.input}
                placeholder="user name*"
                {...register('userName', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters',
                  },
                })}
              />
              {errors.userName ? (
                <span className={styles.errorInput}>{String(errors.userName.message)}</span>
              ) : (
                <span className={styles.labelInput}>
                  *it won’t be possible to change the username later
                </span>
              )}
            </label>
            <label htmlFor="email" className={styles.label}>
              <input
                id="email"
                className={styles.input}
                placeholder="your email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: reEmail,
                    message: 'Incorrect mail format',
                  },
                })}
              />
              <span className={styles.errorInput}>
                {errors.email && String(errors.email.message)}
              </span>
            </label>
            <label htmlFor="password" className={styles.label}>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="password"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum 8 characters',
                  },
                })}
              />
              {errors.password ? (
                <span className={styles.errorInput}>{String(errors.password.message)}</span>
              ) : (
                <span className={styles.labelInput}>Password must be 8+ characters</span>
              )}
            </label>
            <label htmlFor="repeat" className={styles.label}>
              <input
                id="repeat"
                className={styles.input}
                type="password"
                placeholder="repeat password"
                {...register('repeat', {
                  required: 'This field is required',
                  validate: (value) => {
                    const { password } = getValues();
                    return value === password || 'The passwords do not match';
                  },
                })}
              />
              <span className={styles.errorInput}>
                {errors.repeat && String(errors.repeat.message)}
              </span>
            </label>
            <div className={styles.buttonsBottom}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="checkboxPolitic"
                  className={styles.checkboxInput}
                  {...register('politic', {
                    required: '',
                  })}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="checkboxPolitic" className={styles.checkboxLabel}></label>
                <span className={styles.checkboxSpan}>
                  I agree to EPX{' '}
                  <a
                    className={styles.checkboxSpanA}
                    href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0">
                    Terms of use
                  </a>{' '}
                  and{' '}
                  <a
                    className={styles.checkboxSpanA}
                    href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0">
                    Privacy statement
                  </a>
                  .
                </span>
              </div>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="checkboxSubscription"
                  className={styles.checkboxInput}
                  {...register('subscription')}
                />
                <label htmlFor="checkboxSubscription" className={styles.checkboxLabel}></label>
                <span className={styles.checkboxSpan}>Subscribe to EPX news.</span>
              </div>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={styles.buttonSubmit}>
                <img src={signUp} alt="singUp" className={styles.buttonSubmitImg} />
              </button>
            </div>
          </form>
          <div className={styles.swapBottom}>
            <span className={styles.swapBottomText}>Already have an account?</span>
            <Link to="/authorization" className={styles.swapBottomLink}>
              Sign in
            </Link>
          </div>
          <div className={styles.errorBlock}>
            {isError && (
              <span className={styles.errorMessage}>
                Registration error:{' '}
                {error && 'data' in error
                  ? (error.data as { message?: string })?.message || 'Unknown error'
                  : 'Unknown error'}
              </span>
            )}
          </div>
        </div>
        <div className={styles.blockRight}>
          <img src={signUpPhoto} alt="signUpPhoto" className={styles.picture} />
        </div>
      </div>
    </div>
  );
}
