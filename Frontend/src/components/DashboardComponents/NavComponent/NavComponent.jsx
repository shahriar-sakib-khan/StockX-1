import { NavLink } from "react-router-dom";
import styles from "./NavComponent.module.css";

export default function NavComponent({ path = "", imgSrc = "", title = "" }) {
  return (
    <NavLink to={path} className={styles.navItem}>
      <img src={imgSrc} alt="" />
      <span>{title}</span>
    </NavLink>
  );
}
