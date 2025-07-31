import { useEffect, useState } from 'react';
import { useConfirmEmailMutation } from '../../features/api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './ConfirmEmail.module.scss';

export default function ConfirmEmail() {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      setLoading(true);
      try {
        if (token) {
          const response = await confirmEmail(token).unwrap();
          console.log('Email confirmed:', response);
        }
      } catch (error) {
        console.error('Email confirmation failed:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const currentUrl = window.location.href;
    let token;

    if (currentUrl.includes('/confirm/')) {
      token = currentUrl.split('/confirm/')[1];
      verifyEmail(token);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.content}>
      <span className={styles.title}>Подтверждение email</span>
      {isLoading ? (
        <span className={styles.text}>Пожалуйста, подождите, идет проверка...</span>
      ) : error ? (
        <span className={styles.text}>Ошибка верификации</span>
      ) : (
        <span className={styles.text}>Почта успешно подтверждена!</span>
      )}
    </div>
  );
}
