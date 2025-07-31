import { Link } from 'react-router-dom';

import styles from './Navigation.module.scss';

import logo from '../../assets/img/logo.svg';
import about from '../../assets/img/about.svg';
import help from '../../assets/img/help.svg';
import pricing from '../../assets/img/pricing.svg';
import main from '../../assets/img/main.svg';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>
        <img src={logo} alt="logo" />
        <span className={styles.navLogoText}>
          AI STOCK <br />
          GENERATOR
        </span>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navListEl}>
          <img src={main} alt="main" />
          <Link to="/" className={styles.navListElText}>
            Main
          </Link>
        </li>
        <li className={styles.navListEl}>
          <img src={pricing} alt="pricing" />
          <span className={styles.navListElText}>Pricing</span>
        </li>
        <li className={styles.navListEl}>
          <img src={help} alt="help" />
          <span className={styles.navListElText}>Help</span>
        </li>
        <li className={styles.navListEl}>
          <img src={about} alt="about" />
          <span className={styles.navListElText}>About</span>
        </li>
      </ul>
    </nav>
  );
}
