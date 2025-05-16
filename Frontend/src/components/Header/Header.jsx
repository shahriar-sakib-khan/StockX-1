import Logo from "../Logo/Logo";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className="wrapper">
        <header className={styles.header}>
          <Logo />
          <ThemeSwitch />
        </header>
      </div>
    </div>
  );
};

export default Header;
