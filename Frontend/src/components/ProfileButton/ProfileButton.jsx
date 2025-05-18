import { CgProfile } from "react-icons/cg";
import styles from "./ProfileButton.module.css";

export default function ProfileButton({ className = "" }) {
  return (
    <div className={[styles.profileButton, className].join(" ")}>
      <CgProfile />
    </div>
  );
}
