import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Layuot.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
