import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <h1>Landing page</h1>
      <NavLink to="/login">Get Started</NavLink>
    </div>
  );
}
