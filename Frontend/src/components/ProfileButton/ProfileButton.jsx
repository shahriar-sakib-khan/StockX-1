import { CgProfile } from "react-icons/cg";
import styles from "./ProfileButton.module.css";
import { NavLink } from "react-router-dom";

export default function ProfileButton({ className = "" }) {
  return (
    <div className={[styles.profileButton, className].join(" ")}>
      <NavLink to="/dashboard/profile" className={styles.link}>
        <CgProfile />
      </NavLink>
    </div>
  );
}
