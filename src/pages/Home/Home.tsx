import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
// import { setUser } from '../../redux/slices/userSlice';

export default function Home() {
  const { user } = useAppSelector((state) => state.userSlice);
  return (
    <div>
      <Link to="/registration">Регистрация</Link>
      <Link to="/authorization">Авторизация</Link>
      <div>
        <span>user name: {user.name}</span>
        <span>email: {user.email}</span>
      </div>
    </div>
  );
}
