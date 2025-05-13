import useThemeStore from "../../stores/ThemeStore";
import styles from "./ThemeSwitch.module.css";

export default function ThemeSwitch({ className = "" }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => toggleTheme(theme)}
      className={[styles.theme, className].join(" ")}
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
