import { useEffect, useState } from 'react';

import { useConfirmEmailMutation } from '../../features/api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ConfirmEmail.module.scss';

export default function ConfirmEmail() {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      setLoading(true);
      try {
        const response = await confirmEmail(token).unwrap();
        console.log('Email confirmed:', response);
      } catch (error) {
        console.error('Email confirmation failed:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const pathParts = location.pathname.split('/confirm/');

    if (pathParts.length === 2 && pathParts[1]) {
      const token = pathParts[1];
      verifyEmail(token);
    } else {
      console.error('Invalid confirmation URL');
      setError(true);

      setTimeout(() => navigate('/'), 2000);
    }
  }, [confirmEmail, navigate, location.pathname]);

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
