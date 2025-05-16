import { NavLink } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <h1>Login page</h1>
      <NavLink to="/dashboard">Login</NavLink>
    </div>
  );
}
