import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import styles from './Home.module.scss';
import signUp from '../../assets/img/signUpButton.svg';
import signIn from '../../assets/img/signInButton.svg';
// import { setUser } from '../../redux/slices/userSlice';

export default function Home() {
  const { user } = useAppSelector((state) => state.userSlice);
  return (
    <div className={styles.content}>
      <Link to="/registration">
        <img src={signUp} alt="singUp" className={styles.sign} />
      </Link>
      <Link to="/authorization">
        <img src={signIn} alt="singIn" className={styles.sign} />
      </Link>
      <div className={styles.account}>
        <span className={styles.accountData}>
          user name: <span className={styles.accountDataValue}>{user.name}</span>
        </span>
        <span className={styles.accountData}>
          email: <span className={styles.accountDataValue}>{user.email}</span>
        </span>
      </div>
    </div>
  );
}
